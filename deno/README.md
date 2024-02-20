# Pirsch Analytics Deno Demo

**This demo is outdated since Pirsch version 2.2. We now offer tag-based segmentation that is superior to the approach in this demo. Please refer to the [web demo](../web).**

This demo shows how you can leverage Pirsch to do A/B testing from your backend. Everything shown here can also be achieved in the browser using JavaScript.

A middleware is added to all sites (`routes/_middleware.ts`) to track page views and set up A/B testing. An event will be set *once*, containing the variants displayed to the user. To ensure they stay the same, a cookie will be used to preserve this information for up to 24 hours.

All things related to tracking are contained in the `analytics` directory. The payload for the TypeScript SDK requires a bit of mapping, as it is built for Node.

## Configuration

The application is configured in `deno.json` and `.env`.

```json
{
  // ...
  "pirsch": {
    "hostname": "localhost.com",
    "accessToken": "",
    "protocol": "http"
  }
}
```

To set the access key for Pirsch, generate one on the settings page and paste it into the `.env` file (not included in the repository).

```
PIRSCH_TOKEN=pa_82xTB69...
```

## Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
