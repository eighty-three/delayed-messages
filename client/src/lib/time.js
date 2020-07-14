import ky from 'ky-universal';
import HOST from '@/lib/host';
const api = `${HOST}/api/messages`;

export async function getTime() {
  try {
    const response = await ky(`${api}/time`);
    const time = await response.json();
    return time;
  } catch (err) {
    return { error: 'Invalid URL', statusCode: 404 };
  }
}
