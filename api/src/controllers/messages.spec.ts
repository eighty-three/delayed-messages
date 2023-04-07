import request from 'supertest';
import http from 'http';
import app from '../app';
import { nanoid } from 'nanoid';
import * as messages from '../models/messages';
const server = http.createServer(app).listen(8090); // Different port for tests

//Input for createMessage
const [ hours, minutes, message ] = [23, 59, 'test message'];
const incorrectData = { hours, minutes };
const correctData = { hours, minutes, message };

//Time
const currentTime: number = Math.floor(Date.now() / 1000);
const target: number = currentTime + (hours * 3600) + (minutes * 60);
const pastTarget: number = (target + 2) * 1000;
const pastExpiration: number = (currentTime + 172780) * 1000;

//Dummy URLs for getMessage
const url400 = 'abc123';
const url404 = nanoid(10);

//Setup and cleanup
let testUrl_createMessage: string, testUrl_getTarget: string, testUrl_getMessage: string, testUrl_deleteUrl: string;
beforeAll( async () => { //Create dummy messages
  const getTargetResult = await request(server).post('/api/messages/createMessage').send(correctData);
  testUrl_getTarget = getTargetResult.body;

  const getMessageResult = await request(server).post('/api/messages/createMessage').send(correctData);
  testUrl_getMessage = getMessageResult.body;

  const deleteUrlResult = await request(server).post('/api/messages/createMessage').send(correctData);
  testUrl_deleteUrl = deleteUrlResult.body;
});

afterAll( async () => {
  await messages.deleteMessage(testUrl_createMessage);
  await messages.deleteMessage(testUrl_getTarget);
  await messages.deleteMessage(testUrl_getMessage);
  server.close();
});

const getMessageOutput = { message: correctData.message, expire: target + 86400 };

describe('for createMessage', () => {
  test('incorrect params should return 400', async () => {
    const result = await request(server).post('/api/messages/createMessage').send(incorrectData);
    expect(result.status).toEqual(400);
  });

  test('correct params should return 200, creates message', async () => {
    const result = await request(server).post('/api/messages/createMessage').send(correctData);
    testUrl_createMessage = result.body;
    expect(result.status).toEqual(200);
  });
});

describe('for getMessage', () => {
  test('invalid url should return 400', async () => {
    const result = await request(server).get(`/api/messages/getMessage/${url400}`);
    expect(result.status).toEqual(400);
  });

  test('no row found should return 404', async () => {
    const result = await request(server).get(`/api/messages/getMessage/${url404}`);
    expect(result.status).toEqual(404);
  });

  test('current < target should return target', async () => {
    const currentDateMock = jest.spyOn(Date, 'now').mockImplementation(() => currentTime);
    const result = await request(server).get(`/api/messages/getMessage/${testUrl_getTarget}`);
    expect(result.body.target).toEqual(target);
    currentDateMock.mockRestore();
  });

  test('current > target should return message object', async () => {
    const currentDateMock = jest.spyOn(Date, 'now').mockImplementation(() => pastTarget);
    const result = await request(server).get(`/api/messages/getMessage/${testUrl_getMessage}`);
    expect(result.body).toEqual(getMessageOutput);
    currentDateMock.mockRestore();
  });

  test('current > expire should delete message', async () => {
    const currentDateMock = jest.spyOn(Date, 'now').mockImplementation(() => pastExpiration);
    const result = await request(server).get(`/api/messages/getMessage/${testUrl_deleteUrl}`);
    expect(result.body).toEqual({ error: 'Deleted URL', statusCode: 410 });
    currentDateMock.mockRestore();
  });
});

describe('for time', () => {
  test('should return time', async () => {
    const result = await request(server).get('/api/messages/time');
    const checkTime: number = Math.floor(Date.now() / 1000);
    expect(result.body).toEqual({ currentTime: checkTime });
  });
});

