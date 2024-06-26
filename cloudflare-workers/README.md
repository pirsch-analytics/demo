# Pirsch Analytics Cloudflare Workers Proxy Demo

This demo shows how you can use [Cloudflare Workers](https://workers.cloudflare.com/) to proxy the Pirsch Analytics scripts and requests. Cloudflare workers are free for up to 100,000 requests a day.

## Configuration and Usage

Create a free account at [Cloudflare](https://cloudflare.com/) and create a new worker. Copy the code from `worker.js` and paste it into the code section.

Next, go to your Pirsch dashboard integration settings page and add a new client with the **Access Key** type. Create the client and copy the access key. Paste into the `accessKey` constant right at the top of the worker script.

```js
const accessKey = "pa_x92lfoe...";
```

Adjust the path to your liking. These will later be used to integrate the snippet on your page and shouldn't contain any keywords blocked by ad blockers, like *tracker*, *event*, or *hit*. By default, they will look like this.

```js
const scriptPath = "/static/files/pa.js";

const pageViewPath = "/p/pv";
const eventPath = "/p/e";
const sessionPath = "/p/s";
```

You can also adjust the `Access-Control-Allow-Origin` if you like.

```js
// Allow just a specific domain.
const accessControlAllowOrigin = "your-domain.com";

// Allow all sources.
const accessControlAllowOrigin = "*";
```

After making your adjustments, place the snippet on your website and adjust the code to use your Cloudflare worker like this.

```html
<script defer src="https://round-hill-c3a4.your-account.workers.dev/static/files/pa.js"
    id="pianjs"
    data-hit-endpoint="https://round-hill-c3a4.your-account.workers.dev/p/pv"
    data-event-endpoint="https://round-hill-c3a4.your-account.workers.dev/p/e"
    data-session-endpoint="https://round-hill-c3a4.your-account.workers.dev/p/s"></script>
```

`https://round-hill-c3a4.your-account.workers.dev` needs to be replaced with your own worker URL.
