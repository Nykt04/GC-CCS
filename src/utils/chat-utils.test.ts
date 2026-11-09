import test from 'node:test';
import assert from 'node:assert/strict';
import { formatChatContents, RawChatMessage } from './chat-utils';

test('formatChatContents removes leading model message', () => {
  const raw: RawChatMessage[] = [
    { role: 'model', text: 'Hello, I am Turing' },
    { role: 'user', text: 'Tell me about BSIT' }
  ];

  const formatted = formatChatContents(raw);
  assert.equal(formatted.length, 1);
  assert.equal(formatted[0].role, 'user');
  assert.equal(formatted[0].parts[0].text, 'Tell me about BSIT');
});

test('formatChatContents preserves user-model alternation', () => {
  const raw: RawChatMessage[] = [
    { role: 'user', text: 'Hi' },
    { role: 'model', text: 'Hello! How can I help?' },
    { role: 'user', text: 'What are the tuition fees?' }
  ];

  const formatted = formatChatContents(raw);
  assert.equal(formatted.length, 3);
  assert.equal(formatted[0].role, 'user');
  assert.equal(formatted[1].role, 'model');
  assert.equal(formatted[2].role, 'user');
});

test('formatChatContents merges consecutive same-role turns', () => {
  const raw: RawChatMessage[] = [
    { role: 'user', text: 'First part' },
    { role: 'user', text: 'Second part' }
  ];

  const formatted = formatChatContents(raw);
  assert.equal(formatted.length, 1);
  assert.equal(formatted[0].role, 'user');
  assert.ok(formatted[0].parts[0].text.includes('First part'));
  assert.ok(formatted[0].parts[0].text.includes('Second part'));
});
