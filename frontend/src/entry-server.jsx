import React from 'react';
import { renderToString } from 'react-dom/server';
import { HeadProvider } from './context/HeadContext';
import App from './App';

export function render(url) {
  const headState = {
    title: "",
    description: "",
    canonicalUrl: "",
    robots: "index, follow",
    schemas: [],
    og: {},
    twitter: {}
  };

  const appHtml = renderToString(
    <HeadProvider headState={headState}>
      <App url={url} />
    </HeadProvider>
  );

  return {
    appHtml,
    headState
  };
}
