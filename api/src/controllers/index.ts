import express from 'express';
import validator from '../utils/validator';
const router = express.Router();

// Messages
import * as messages from './messages';
import * as messagesSchema from './messages.schema';
router.post('/createMessage', validator(messagesSchema.createMessage, 'body'), messages.createMessage);
router.get('/getMessage/:id', validator(messagesSchema.getMessage, 'params'), messages.getMessage);

// Time
import * as time from './time';
router.get('/time', time.getTime);

export default router;
