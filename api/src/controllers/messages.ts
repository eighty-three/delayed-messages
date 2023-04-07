import { RequestHandler } from 'express';
import { messages } from '../models';
import { nanoid } from 'nanoid';

export const createMessage: RequestHandler = async (req, res) => {
  const { hours, minutes, message } = req.body; 
  const seconds: number = (hours === 0 && minutes === 0)
    ? 10 //If both are equal to zero, add a 10 second buffer
    : 0;
  const id: string = nanoid(10);
  const target: number = 
    Math.floor(Date.now() / 1000) +
    (hours * 3600) + (minutes * 60) + seconds;

  const url = await messages.createMessage(id, message, target);
  res.status(200).json(url.id);
};


export const getMessage: RequestHandler = async (req, res) => {
  const id: string = req.params.id;
  const message = await messages.getMessage(id);
  if (!message) {
    res.status(404).json({ error: 'Not Found', statusCode: 404 });
    return;
  }

  const current: number = Math.floor(Date.now() / 1000);
  const target: number = message.target;
  const expire: number = target + 86400; //After a day

  if (current > expire) {
    const deletedMessage = await messages.deleteMessage(id);
    console.dir(`Deleted ${deletedMessage.id} at ${current}`);
    res.status(410).json({ error: 'Deleted URL', statusCode: 410 });
  } else if (current > target) {
    res.json({ 'message': message.message, 'expire': expire });
  } else if (current < target) {
    res.json({ 'target': target });
  }
};

