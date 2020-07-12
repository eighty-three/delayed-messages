import Router from 'next/router';
import ky from 'ky-universal';
import HOST from './host';
const api = `${HOST}/api/messages`;

export async function getMessageData(id) {
  try {
    const response = await ky(`${api}/getMessage/${id}`, { throwHttpErrors: false });
    const data = await response.json();
    return data;
  } catch (err) {
    return { error: 'Invalid URL', statusCode: 404 };
  }
}

export async function submitMessage(data) {
  const submit = await ky.post(`${api}/createMessage`,
    {
      json:
        {
          'message': data.content,
          'hours': Number(data.hours),
          'minutes': Number(data.minutes),
        }
    });
  const url = await submit.json();
  Router.push('/messages/[id]', `/messages/${url}`);
}

