# Pirsch Analytics Cloudflare Workers Proxy Demo

This demo shows how you can use [Cloudflare Workers](https://workers.cloudflare.com/) to proxy the Pirsch Analytics scripts and requests. Cloudflare workers are free for up to 100,000 requests a day.

## Configuration and Usage

Create a free account at [Cloudflare](https://cloudflare.com/) and create a new worker. Copy the code from `worker.js` and paste it into the code section.

Next, go to your Pirsch dashboard integration settings page and add a new client with the **Access Key** type. Create the client and copy the access key. Paste into the `accessKey` constant right at the top of the worker script.

```js
const accessKey = "pa_x92lfoe...";
```

Adjust the paths to your likings. These will later be used to integrate the snippet on your page and shouldn't contain any keywords blocked by ad blockers, like *tracker*, *event*, or *hit*. By default, they will look like this.

```js
const scriptPath = "/path/script.js";
const eventScriptPath = "/path/script-e.js";
const extendedScriptPath = "/path/script-ex.js";
const sessionScriptPath = "/path/script-s.js";

const pageViewPath = "/path/pv";
const eventPath = "/path/e";
const sessionPath = "/path/s";
```

After making your adjustments, place the regular tracking snippet on your website. You can use any of the snippets available: `pirsch.js` for page views, `pirsch-events.js` for events, `pirsch-sessions.js` to keep sessions alive, or `pirsch-extended.js` to combine all of them including some additional features. Adjust the snippets to use your Cloudflare worker like this.

```html
<script defer type="text/javascript"
    src="https://round-hill-c3a4.your-account.workers.dev/path/script.js"
    id="pirschjs"
    data-endpoint="https://round-hill-c3a4.your-account.workers.dev/path/pv"></script>
```

`https://round-hill-c3a4.your-account.workers.dev` needs to be replaced with your own worker URL. If you made adjustments to the paths, you also need to change `/path/script.js` and `/path/pv`. This example uses the `pirsch.js` snippet. If you would like to use another script, you also need to adjust the `id` attribute to `pirscheventsjs`, `pirschsessionsjs`, or `pirschextendedjs`.
