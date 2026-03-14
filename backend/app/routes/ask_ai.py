from fastapi import APIRouter
from ..models.video_model import AskAIRequest, AskAIResponse
from ..services.embeddings import generate_embedding
from ..services.vector_store import get_store

router = APIRouter()

@router.post("/ask-ai", response_model=AskAIResponse)
async def ask_ai(request: AskAIRequest):
    # 1. Embed query
    query_emb = generate_embedding(request.question)
    
    # 2. Search FAISS index to get context
    store = get_store(request.video_id)
    matches = store.search(query_emb, top_k=3)
    
    if not matches:
        return AskAIResponse(answer="I couldn't find any relevant information in this video to answer your question.")
        
    # 3. Compile context
    context_texts = [match['text'] for match in matches]
    context = " ".join(context_texts)
    
    # 4. Generate LLM Response using OpenRouter
    from openai import OpenAI
    
    key = "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"
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=key,
    )
    
    prompt = f"""
    You are an AI assistant helping a user understand a programming video tutorial.
    Answer their question based ONLY on the transcript context provided below.
    If the context is insufficient, simply state you don't know based on the video.
    
    Context from video:
    "{context}"
    
    User Question: {request.question}
    """
    
    try:
        completion = client.chat.completions.create(
            extra_headers={},
            model="google/gemini-2.5-flash-free",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        answer = completion.choices[0].message.content
    except Exception as e:
        print(f"LLM Error: {e}")
        answer = "Sorry, I had an issue connecting to the AI provider to answer that."
        
    return AskAIResponse(answer=answer)
