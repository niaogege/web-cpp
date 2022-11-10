import React from 'react'
import { hydrate } from 'react-dom'
import './index.css'
import App from './App'
import { fetchData } from './entry-server'

async function init() {
  let data;
  // @ts-ignore
  if (window.context) {
    // @ts-ignore
    data = window.context
  } else {
    data = await fetchData()
  }
  const container = document.getElementById("root") as HTMLElement;

  //@ts-ignore
  hydrate(<React.StrictMode>
    <App data={data} suppressHydrationWarning={true} />
  </React.StrictMode>, container);
}
init()