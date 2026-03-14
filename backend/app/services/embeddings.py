from sentence_transformers import SentenceTransformer

# Load a lightweight sentence transformer model for embeddings
# all-MiniLM-L6-v2 is small and fast
model = SentenceTransformer('all-MiniLM-L6-v2')

def generate_embedding(text: str):
    """Generates an embedding vector for the given string."""
    return model.encode(text)

def generate_embeddings_batch(texts: list[str]):
    """Generates embeddings for a list of strings."""
    return model.encode(texts)
