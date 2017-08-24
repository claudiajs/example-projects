import express from 'express'
import path from 'path'
import proxy from 'http-proxy-middleware'

import reactApp from './app'

const host = process.env.REACT_APP_HOST || 'localhost'
export const serverPort = process.env.NODE_ENV === 'development' ?
  process.env.REACT_APP_SERVER_PORT :
  process.env.REACT_APP_PORT || 80

export const app = express()

if (process.env.NODE_ENV === 'production') {
  // In production we want to serve our JavaScripts from a file on the file
  // system.
  app.use('/static', express.static(path.join(process.cwd(), 'build/client/static')));
} else {
  // Otherwise we want to proxy the webpack development server.
  app.use(['/static','/sockjs-node'], proxy({
    target: `http://localhost:${process.env.REACT_APP_CLIENT_PORT}`,
    ws: true,
    logLevel: 'error'
  }));
}

app.use('/', express.static('build/client'))

app.use(reactApp)

// We need to uncomment this because aws-serverless-express handles listening.
// for dev, run localServer.js
// app.listen(serverPort)
// console.log(`Listening at http://${host}:${serverPort}`)
