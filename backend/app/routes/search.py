from fastapi import APIRouter, HTTPException
from ..models.video_model import SearchRequest, SearchResponse, SearchResult
from ..services.embeddings import generate_embedding
from ..services.vector_store import get_store
from ..utils.timestamp_utils import format_timestamp

router = APIRouter()

@router.post("/search", response_model=SearchResponse)
async def search_video(request: SearchRequest):
    # 1. Embed query
    query_emb = generate_embedding(request.query)
    
    # 2. Search FAISS index
    store = get_store(request.video_id)
    matches = store.search(query_emb, top_k=3)
    
    if not matches:
        return SearchResponse(results=[])
        
    # 3. Format results
    results = []
    # Deduplicate results that might be identical timestamps
    seen_times = set()
    for match in matches:
        time_formatted = format_timestamp(match['start_time'])
        if time_formatted not in seen_times:
            results.append(SearchResult(
                timestamp=time_formatted,
                text=match['text']
            ))
            seen_times.add(time_formatted)
            
    # Sort results chronologically
    from ..utils.timestamp_utils import parse_timestamp
    results.sort(key=lambda x: parse_timestamp(x.timestamp))
    return SearchResponse(results=results)
