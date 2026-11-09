export interface RawChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface FormattedGeminiContent {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

/**
 * Normalizes a list of chat messages for the Gemini API:
 * 1. Strips any leading 'model' messages (Gemini API requires conversation to start with 'user')
 * 2. Ensures every part has non-empty text
 * 3. Merges consecutive messages with the same role if any
 */
export function formatChatContents(messages: RawChatMessage[]): FormattedGeminiContent[] {
  if (!Array.isArray(messages) || messages.length === 0) {
    return [{ role: 'user', parts: [{ text: 'Hello' }] }];
  }

  // Find index of first user message
  const firstUserIdx = messages.findIndex((m) => m.role === 'user');
  if (firstUserIdx === -1) {
    // If no user message found, fallback to last message text as user
    const lastText = messages[messages.length - 1]?.text?.trim() || 'Hello';
    return [{ role: 'user', parts: [{ text: lastText }] }];
  }

  const validMessages = messages.slice(firstUserIdx);
  const formatted: FormattedGeminiContent[] = [];

  for (const msg of validMessages) {
    const text = (msg.text || '').trim();
    if (!text) continue;

    const role: 'user' | 'model' = msg.role === 'user' ? 'user' : 'model';
    const lastItem = formatted[formatted.length - 1];

    if (lastItem && lastItem.role === role) {
      // Merge with previous turn
      lastItem.parts[0].text += `\n\n${text}`;
    } else {
      formatted.push({
        role,
        parts: [{ text }],
      });
    }
  }

  if (formatted.length === 0) {
    return [{ role: 'user', parts: [{ text: 'Hello' }] }];
  }

  return formatted;
}
