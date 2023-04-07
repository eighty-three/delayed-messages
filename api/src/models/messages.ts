import db from './db';
import { TGetMessage, TDeleteMessage, TCreateMessage } from './messages.types';
const dbTable = 'delayed_messages';

export const getMessage: TGetMessage = async (id, table = dbTable) => {
  return await db.oneOrNone('SELECT * FROM $1:name WHERE id=$2', [table, id]);
};

export const deleteMessage: TDeleteMessage = async (id, table = dbTable) => {
  return await db.one('DELETE FROM $1:name WHERE id=$2 RETURNING id', [table, id]);
};

export const createMessage: TCreateMessage = async (id, message, target, table = dbTable) => {
  const input = [id, message, target];
  return await db.one('INSERT INTO $1:name (id, message, target) VALUES ($2:csv) RETURNING id', [table, input]);
};

