import '@/styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';

//NProgress
import NProgress from 'nprogress';
import '@/styles/nprogress.css';
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object
};

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = propTypes;
