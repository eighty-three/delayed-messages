import Head from 'next/head';
import React from 'react';

import Layout, { siteTitle } from '@/components/Layout';

import MessageForm from '@/components/MessageForm';
import { submitMessage } from '@/lib/messages';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <MessageForm onSubmit={submitMessage} />
      </section>
    </Layout>
  );
}

