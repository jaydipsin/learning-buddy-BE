export const ALLOWED_ROLES = ["admin", "teacher", "student", "parent"];

export  const USER_INTERACTION_INTENTS = {
  "ask-question": "The user is asking a specific question about a subject or topic.",
  "seek-advice": "The user is seeking general advice on study strategies, time management, or learning resources.",
    "performance_check": "The user wants to know if they are performing well in their subjects and how they can improve.",
    "resource_request": "The user is asking for specific learning resources, such as videos, articles, or practice problems.",
    "progress_update": "The user is providing an update on their learning progress or recent scores.",
    "general_chat": "The user is engaging in casual conversation or asking non-specific questions.",
};

export const USER_INTENT_KEYWORDS = {
  "ask-question": ["how", "what", "why", "explain", "clarify"],
  "seek-advice": ["advice", "suggest", "recommend", "tips"],
  "performance_check": ["performance", "score", "grade", "improve"],
  "resource_request": ["resource", "material", "video", "article", "problem"],
  "progress_update": ["update", "progress", "score", "result"],
  "general_chat": ["hello", "hi", "hey", "conversation", "chat"]
};
