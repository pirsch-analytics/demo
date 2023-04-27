/*
 * Create an access key on the integration settings page of your dashboard and enter it here.
 */
const accessKey = "pa_...";

/*
 * Adjust the paths to your likings.
 * The scripts will be available on your Worker URL. Here is an example for pirsch.js:
 * 
 * https://round-hill-c3a4.your-account.workers.dev/path/script.js
 */
const scriptPath = "/path/script.js";
const eventScriptPath = "/path/script-e.js";
const extendedScriptPath = "/path/script-ex.js";
const sessionScriptPath = "/path/script-s.js";

/*
 * Adjust the endpoints to your likings.
 * They will be used for page view and event requests and point towards your Worker URL.
 * Make sure to not include keywords like "pageview", "hit", "event", and so on, or they will be blocked by ad blockers.
 */
const pageViewPath = "/path/pv";
const eventPath = "/path/e";
const sessionPath = "/path/s";

/*
 * Sets the Access-Controll-Allow-Origin header.
 * You can leave this as is to allow traffic from any source, or add your domain.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
 */
const accessControlAllowOrigin = "*";

/*
 * To finish the setup, adjust the src, data-endpoint, data-hit-endpoint and data-event-endpoint attributes of your JavaScript snippet.
 * Here is an example for pirsch.js:
 * 
   <script defer type="text/javascript"
        src="https://round-hill-c3a4.your-account.workers.dev/path/script.js"
        id="pirschjs"
        data-endpoint="https://round-hill-c3a4.your-account.workers.dev/path/pv"></script>
 *
 * The URL must be adjusted to match your Worker URL.
 * For pirsch-extended.js, overwrite the endpoints using data-hit-endpoint and data-event-endpoint instead of data-endpoint.
 * The data-code attribute can be removed.
 * The id attribute must match the script type:
 * 
 * - pirschjs for pirsch.js
 * - pirscheventsjs for pirsch-events.js
 * - pirschextendedjs for pirsch-extended.js
 * - pirschsessionsjs for pirsch-sessions.js
 */

/*
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * DO NOT CHANGE THE CODE BELOW!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

const pirschScriptURL = "https://api.pirsch.io/pirsch.js";
const pirschEventScriptURL = "https://api.pirsch.io/pirsch-events.js";
const pirschExtendedScriptURL = "https://api.pirsch.io/pirsch-extended.js";
const pirschSessionScriptURL = "https://api.pirsch.io/pirsch-sessions.js";
const pirschPageViewEndpoint = "https://api.pirsch.io/api/v1/hit";
const pirschEventEndpoint = "https://api.pirsch.io/api/v1/event";
const pirschSessionEndpoint = "https://api.pirsch.io/api/v1/session";
const pirschReferrerQueryParams = [
  "ref",
  "referer",
  "referrer",
  "source",
  "utm_source",
];

export default {
  async fetch(request, env) {
    return await handleRequest(request);
  }
}

async function handleRequest(request) {
  const path = new URL(request.url).pathname;
  let result;

  if (path === scriptPath) {
    result = await getScript(request, pirschScriptURL);
  } else if (path === eventScriptPath) {
    result = await getScript(request, pirschEventScriptURL);
  } else if (path === extendedScriptPath) {
    result = await getScript(request, pirschExtendedScriptURL);
  } else if (path === sessionScriptPath) {
    result = await getScript(request, pirschSessionScriptURL);
  } else if (path === pageViewPath) {
    result = await handlePageView(request);
  } else if (path === eventPath) {
    result = await handleEvent(request);
  } else if (path === sessionPath) {
    result = await handleSession(request);
  } else {
    result = new Response(null, {
      status: 404
    });
  }

  const response = new Response(result.body, result);
  response.headers.set("Access-Control-Allow-Origin", accessControlAllowOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

async function getScript(request, script) {
    let response = await caches.default.match(request);

    if (!response) {
        response = await fetch(script);
        await caches.default.put(request, response.clone());
    }

    return response;
}

async function handlePageView(request) {
  const response = await fetch(pirschPageViewEndpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessKey}`
    },
    body: JSON.stringify(getBody(request))
  });
  return new Response(response.body, {
    status: response.status
  });
}

async function handleEvent(request) {
  const response = await fetch(pirschEventEndpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessKey}`
    },
    body: JSON.stringify(await getData(request))
  });
  return new Response(response.body, {
    status: response.status
  });
}

async function handleSession(request) {
  const response = await fetch(pirschSessionEndpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessKey}`
    },
    body: JSON.stringify(await getData(request))
  });
  return new Response(response.body, {
    status: response.status
  });
}

function getBody(request) {
  const url = new URL(request.url);
  return {
    url: url.searchParams.get("url"),
    code: url.searchParams.get("code"),
    ip: request.headers.get("CF-Connecting-IP"),
    user_agent: request.headers.get("User-Agent"),
    accept_language: request.headers.get("Accept-Language"),
    title: url.searchParams.get("t"),
    referrer: url.searchParams.get("ref"),
    screen_width: Number.parseInt(url.searchParams.get("w"), 10),
    screen_height: Number.parseInt(url.searchParams.get("h"), 10)
  };
}

async function getData(request) {
  const data = await request.json();
  data.ip = request.headers.get("CF-Connecting-IP");
  data.user_agent = request.headers.get("User-Agent");
  data.accept_language = request.headers.get("Accept-Language");
  return data;
}
