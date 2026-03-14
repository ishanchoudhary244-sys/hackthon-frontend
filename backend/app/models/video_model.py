from pydantic import BaseModel
from typing import List

class UploadResponse(BaseModel):
    video_id: str
    message: str

class SearchRequest(BaseModel):
    video_id: str
    query: str

class SearchResult(BaseModel):
    timestamp: str
    text: str

class SearchResponse(BaseModel):
    results: List[SearchResult]

class AskAIRequest(BaseModel):
    video_id: str
    question: str

class AskAIResponse(BaseModel):
    answer: str
