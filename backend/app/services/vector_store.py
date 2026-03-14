import faiss
import numpy as np
import json
import os
from typing import List, Dict, Any

# Assuming embedding size for 'all-MiniLM-L6-v2' is 384
DIMENSION = 384
DATA_DIR = "data"

class VectorStore:
    def __init__(self, video_id: str):
        self.video_id = video_id
        self.index_path = os.path.join(DATA_DIR, f"{video_id}.index")
        self.meta_path = os.path.join(DATA_DIR, f"{video_id}_meta.json")
        
        if os.path.exists(self.index_path) and os.path.exists(self.meta_path):
            self.index = faiss.read_index(self.index_path)
            with open(self.meta_path, 'r') as f:
                self.metadata = json.load(f)
        else:
            self.index = faiss.IndexFlatL2(DIMENSION)
            self.metadata = []

    def add_texts(self, embeddings: np.ndarray, chunks: List[Dict[str, Any]]):
        if len(embeddings) == 0:
            return
            
        embeddings_np = np.array(embeddings).astype('float32')
        self.index.add(embeddings_np)
        self.metadata.extend(chunks)
        
        # Save to disk
        os.makedirs(DATA_DIR, exist_ok=True)
        faiss.write_index(self.index, self.index_path)
        with open(self.meta_path, 'w') as f:
            json.dump(self.metadata, f)

    def search(self, query_embedding: np.ndarray, top_k: int = 3) -> List[Dict[str, Any]]:
        if self.index.ntotal == 0:
            return []
            
        query_np = np.array([query_embedding]).astype('float32')
        distances, indices = self.index.search(query_np, top_k)
        
        results = []
        for idx in indices[0]:
            if idx != -1 and idx < len(self.metadata):
                results.append(self.metadata[idx])
        return results

def get_store(video_id: str) -> VectorStore:
    return VectorStore(video_id)
