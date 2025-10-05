# Pirsch Analytics Cloudflare Workers Proxy Demo

This demo shows how you can use [Cloudflare Workers](https://workers.cloudflare.com/) to proxy the Pirsch Analytics scripts and requests. Cloudflare workers are free for up to 100,000 requests a day.

## Configuration and Usage

Create a free account at [Cloudflare](https://cloudflare.com/) and create a new worker. Copy the code from `worker.js` and paste it into the code section.

Next, go to your Pirsch dashboard integration settings page and add a new client with the **Access Key** type. Create the client and copy the access key. Paste into the `accessKey` constant right at the top of the worker script. You can set up the worker to support multiple websites/dashboards.

```js
const dashboards = {
    "example.com": {
        accessKey: "pa_x92lfoe..."
    }
};
```

To create rollup views, add the `rollup` configuration for each dashboard. Page views and events will be sent to these in addition to the main configured dashboard. The path `prefix` and `suffix` are optional and will only be applied to rollup-views.

```js
const dashboards = {
    "example.com": {
        accessKey: "pa_x92lfoe..."
    },
    "second-with-rollup.com": {
        accessKey: "pa_a53lvpw...",
        rollup: [
            "pa_rollup1...", // access key of the rollup view dashboard
            "pa_rollup2...", // supports multiple rollup dashboards
            // ...
        ],
        options: {
            prefix: "/prefix/", // optional prefix for rollup-views
            suffix: "/suffix" // optional suffix for rollup-views
        }
    }
};
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
