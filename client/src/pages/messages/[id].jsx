import React from 'react';
import Head from 'next/head';
import { useState } from 'react';

import Layout, { siteTitle } from '@/components/Layout';

import Countdown from '@/components/Countdown';
import { getMessageData } from '@/lib/messages';
import { getTime } from '@/lib/time';

export default function Home({ url, target, message, expire, currentTime, error }) {
  const [ messageContents, setMessageContents ] = useState({target, currentTime, message});
  const timeRemaining = target - currentTime;
  const [ count, setCount ] = useState(timeRemaining);

  const countDown = async () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      const response = await getMessageData(url);
      const newMessage = {
        message: response.message,
        expire: response.expire
      };

      setMessageContents({...newMessage});
    }
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-center">
        { error &&
          <p>{error}</p>
        }

        {messageContents.target
          ? <Countdown timeRemaining={count} setCounter={countDown} />
          : <p>{messageContents.message}</p>
        }
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id: url }, res }) {
  const message = await getMessageData(url);
  const newTime = await getTime();
  if (message.error) res.statusCode = message.statusCode;

  return {
    props: {
      url,
      ...message,
      currentTime: newTime.currentTime
    }
  };
}

