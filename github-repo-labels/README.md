# Dynamic SVG labels with basic stats for GitHub repositories

This example shows how to generate simple SVG labels using Lambda, such as the one below:

[![claudiajs/claudia](https://repolabels.net/claudiajs/claudia/large.svg)](https://github.com/claudiajs/claudia/)

See [repolabels.net](repolabels.net) for a live version of this example, and generate labels for your own repositories.

## How it works

The code in [web.js](web.js) just connects to the GitHub developer API to retrieve repository statistics, and then
performs a simple string replacement on [SVG template files](svg/).

This example demonstrates how to:

- connect to a third party REST API (github)
- store and use third party API keys in stage variables
- use path parameters for API requests (requests are processed as `{owner}/{repo}/{template}`)
- enforce the usage of an API key
