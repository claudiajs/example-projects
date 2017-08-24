import React from 'react'
import { StaticRouter as Router } from 'react-router'
import Context from 'react-context-component'

import render from './render'
import App from '../shared/App'

const ErrorPage = () => <h1>Oops there was an error</h1>

const reactApp = (req, res) => {
  const context = {}
  let HTML
  let status = 200

  const setStatus = (newStatus) => {
    status = newStatus
  }

  try {
    HTML = render(
      <Context setStatus={setStatus}>
        <Router context={{}} location={req.url}>
          <App />
        </Router>
      </Context>
    )
  } catch (error) {
    HTML = render(ErrorPage)
    status = 500
  }

  if (context.url) {
    res.redirect(301, context.url)
  } else {
    res.status(status).send(HTML)
  }
}

export default reactApp
