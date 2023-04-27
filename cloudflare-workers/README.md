# Pirsch Analytics Cloudflare Workers Proxy Demo

This demo shows how you can use [Cloudflare Workers](https://workers.cloudflare.com/) to proxy the Pirsch Analytics scripts and requests. Cloudflare workers are free for up to 100,000 requests a day.

## Configuration and Usage

Create a free account at [Cloudflare](https://cloudflare.com/) and create a new worker. Copy the code from `worker.js` and paste it into the code section.

Next, go to your Pirsch dashboard integration settings page and add a new client with the **Access Key** type. Create the client and copy the access key. Paste into the `accessKey` constant right at the top of the worker script.

```js
const accessKey = "pa_x92lfoe...";
```

Adjust the paths to your liking. These will later be used to integrate the snippet on your page and shouldn't contain any keywords blocked by ad blockers, like *tracker*, *event*, or *hit*. By default, they will look like this.

```js
const scriptPath = "/static/files/p.js";
const eventScriptPath = "/static/files/ev.js";
const extendedScriptPath = "/static/files/ext.js";
const sessionScriptPath = "/static/files/ses.js";
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

After making your adjustments, place the regular tracking snippet on your website. You can use any of the snippets available: `pirsch.js` for page views, `pirsch-events.js` for events, `pirsch-sessions.js` to keep sessions alive, or `pirsch-extended.js` to combine all of them including some additional features. Adjust the snippets to use your Cloudflare worker like this.

```html
<script defer type="text/javascript"
    src="https://round-hill-c3a4.your-account.workers.dev/static/files/p.js"
    id="pirschjs"
    data-endpoint="https://round-hill-c3a4.your-account.workers.dev/p/pv"></script>
```

`https://round-hill-c3a4.your-account.workers.dev` needs to be replaced with your own worker URL. If you made adjustments to the paths, you also need to change `/path/script.js` and `/path/pv`. This example uses the `pirsch.js` snippet. If you would like to use another script, you also need to adjust the `id` attribute to `pirscheventsjs`, `pirschsessionsjs`, or `pirschextendedjs`.
