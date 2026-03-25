import { USER_INTERACTION_INTENTS } from "../utils/constants";

/**
 * Generates a dynamic system prompt for the AI Assistant.
 * * @param {Object} user - The user document retrieved from MongoDB.
 * @param {Object} intentData - Optional. Extracted intent (e.g., { subject: "physics", intentType: "performance_check" })
 * @param {Object} performanceData - Optional. Data fetched from other collections (scores, weak topics).
 * @returns {String} The formatted system prompt.
 */

export function generateSystemPrompt(
  user,
  intentData = null,
  performanceData = null,
) {
  // 1. Base Identity
  let prompt = `You are an expert AI mentor and educational assistant. Your role is to provide personalized guidance to students based on their profile and current needs.\n`;
  prompt += `You are currently talking to a ${user.role} named ${user.userName}.\n\n`;

  // 2. Core User Profile
  prompt += `### USER PROFILE\n`;
  prompt += `- Enrolled Subjects: ${user.subjects.length > 0 ? user.subjects.join(", ") : "Not assigned yet"}\n`;

  // Inject additional data if you fetched it from other collections
  if (performanceData) {
    if (performanceData.course)
      prompt += `- Course: ${performanceData.course}\n`;
    if (performanceData.avgScore)
      prompt += `- Overall Avg Score: ${performanceData.avgScore}%\n`;
    if (performanceData.weakTopics)
      prompt += `- Weak Topics: ${performanceData.weakTopics.join(", ")}\n`;
  }

  // 3. Dynamic Intent Handling (The part you specifically asked for)
  if (intentData) {
    prompt += `\n### CURRENT CONTEXT & INTENT\n`;

    if (intentData.subject) {
      prompt += `The user is specifically asking about: ${intentData.subject.toUpperCase()}.\n`;

      // If you have specific scores for this subject, inject them here
      if (
        performanceData &&
        performanceData.subjectScores &&
        performanceData.subjectScores[intentData.subject]
      ) {
        prompt += `Their current score in ${intentData.subject} is ${performanceData.subjectScores[intentData.subject]}%.\n`;
      }
    }

    prompt += `The user's intent is: ${USER_INTERACTION_INTENTS[intentData.intentType]}\n`;
  }

  // 4. AI Rules & Guardrails
  prompt += `\n### INSTRUCTIONS\n`;
  prompt += `- Give short, highly actionable advice.\n`;
  prompt += `- Be encouraging but realistic.\n`;
  prompt += `- Do not share other students' data.\n`;

  return prompt;
}

function extractIntentFromMessage(message) {
  const lowerCaseMessage = message.toLowerCase();

  for (const [intentType, keywords] of Object.entries(USER_INTENT_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerCaseMessage.includes(keyword)) {
        return intentType;
      }
    }
  }
}

export function generateIntentDataFromMessage(message, userSubjects) {
    const intentData = {
        intentType: extractIntentFromMessage(message),
        subject: null, 
    }
}