import * as messages from './messages';
import { nanoid } from 'nanoid';

const newId = nanoid(10);
const dummyId = 'shortid123';
const testTable = 'delayed_messages_test';
const testMessage = 'test message';
const currentDate: number = Math.floor(Date.now() / 1000);

test('should return newly created message', async () => {
  const id = await messages.createMessage(newId, testMessage, currentDate, testTable); 
  expect(id).toStrictEqual({ id: newId });
});

test('should return message object', async () => {
  const message = await messages.getMessage(newId, testTable);
  expect(message).toStrictEqual({ id: newId, message: testMessage, target: currentDate });
});

test('should return null given table', async () => {
  const message = await messages.getMessage(newId);
  expect(message).toStrictEqual(null);
});

test('should return null given dummy ID', async () => {
  const message = await messages.getMessage(dummyId, testTable);
  expect(message).toStrictEqual(null);
});

test('should return null and ID after deletion', async () => {
  const deleteMessage = await messages.deleteMessage(newId, testTable);
  const getMessage = await messages.getMessage(newId, testTable); //if deleted
  const ifDeleted = { status: getMessage, id: deleteMessage.id };
  expect(ifDeleted).toStrictEqual({ status: null, id: newId });
});

