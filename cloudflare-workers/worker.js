/*
 * Create an access key on the integration settings page for each of your dashboards and enter the hostname (in lowercase!) + access key here.
 * Additionally, you can configure one or more other dashboards to send the data to (rollup views).
 */
const dashboards = {
    "hostname.com": {
        accessKey: "pa_...",
        rollup: [
            "pa_..."
        ]
    }
};

/*
 * Adjust the path to your liking.
 * The script will be available on your Worker URL. Here is an example:
 * 
 * https://round-hill-c3a4.your-account.workers.dev/static/files/pa.js
 */
const scriptPath = "/static/files/pa.js";

/*
 * Adjust the endpoints to your likings.
 * They will be used for page view and event requests and point towards your Worker URL.
 * Make sure to not include keywords like "pageview", "hit", "event", and so on, or they will be blocked by ad blockers.
 */
const pageViewPath = "/p/pv";
const eventPath = "/p/e";
const sessionPath = "/p/s";

/*
 * Sets the Access-Controll-Allow-Origin header.
 * You can leave this as is to allow traffic from any source, or add your domain.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
 */
const accessControlAllowOrigin = "*";

/*
 * To finish the setup, adjust the src, data-hit-endpoint, and data-event-endpoint attributes of your JavaScript snippet.
 * Here is an example:
 * 
   <script defer src="https://round-hill-c3a4.your-account.workers.dev/path/pa.js"
        id="pianjs"
        data-hit-endpoint="https://round-hill-c3a4.your-account.workers.dev/path/pv"
        data-event-endpoint="https://round-hill-c3a4.your-account.workers.dev/path/e"></script>
 *
 * The URL must be adjusted to match your Worker URL.
 * The data-code attribute can be removed.
 * The id attribute must match "pianjs".
 */

/*
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * DO NOT CHANGE THE CODE BELOW!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

const pirschScriptURL = "https://api.pirsch.io/pa.js";
const pirschPageViewEndpoint = "https://api.pirsch.io/api/v1/hit";
const pirschEventEndpoint = "https://api.pirsch.io/api/v1/event";
const pirschSessionEndpoint = "https://api.pirsch.io/api/v1/session";

export default {
    async fetch(request) {
        return await handleRequest(request);
    }
}

async function handleRequest(request) {
    const path = new URL(request.url).pathname;
    let result;

    if (path === scriptPath) {
        result = await getScript(request, pirschScriptURL);
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
    response.headers.set("Accept-CH", "Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version, Sec-CH-Width, Sec-CH-Viewport-Width");
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
    const body = JSON.stringify(getBody(request));
    const response = await fetch(pirschPageViewEndpoint, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getAccessKey(request)}`
        },
        body
    });
    getRollupViews(request).forEach(async accessKey => {
        await fetch(pirschPageViewEndpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessKey}`
            },
            body
        });
    });
    return new Response(response.body, {
        status: response.status
    });
}

async function handleEvent(request) {
    const body = JSON.stringify(await getData(request));
    const response = await fetch(pirschEventEndpoint, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getAccessKey(request)}`
        },
        body
    });
    getRollupViews(request).forEach(async accessKey => {
        await fetch(pirschEventEndpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessKey}`
            },
            body
        });
    });
    return new Response(response.body, {
        status: response.status
    });
}

async function handleSession(request) {
    const body = JSON.stringify({
        ip: request.headers.get("CF-Connecting-IP"),
        user_agent: request.headers.get("User-Agent"),
        sec_ch_ua: request.headers.get("Sec-CH-UA"),
        sec_ch_ua_mobile: request.headers.get("Sec-CH-UA-Mobile"),
        sec_ch_ua_platform: request.headers.get("Sec-CH-UA-Platform"),
        sec_ch_ua_platform_version: request.headers.get("Sec-CH-UA-Platform-Version"),
        sec_ch_width: request.headers.get("Sec-CH-Width"),
        sec_ch_viewport_width: request.headers.get("Sec-CH-Viewport-Width")
    });
    const response = await fetch(pirschSessionEndpoint, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getAccessKey(request)}`
        },
        body
    });
    getRollupViews(request).forEach(async accessKey => {
        await fetch(pirschSessionEndpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessKey}`
            },
            body
        });
    });
    return new Response(response.body, {
        status: response.status
    });
}

function getAccessKey(request) {
    return dashboards[getHostname(request)]?.accessKey ?? "";
}

function getRollupViews(request) {
    return dashboards[getHostname(request)]?.rollup ?? [];
}

function getHostname(request) {
    const url = new URL(request.url);
    return new URL(url.searchParams.get("url")).hostname.toLowerCase().trim().replace(/^www\./, "");
}

function getBody(request) {
    const url = new URL(request.url);
    return {
        url: url.searchParams.get("url"),
        code: url.searchParams.get("code"),
        ip: request.headers.get("CF-Connecting-IP"),
        user_agent: request.headers.get("User-Agent"),
        accept_language: request.headers.get("Accept-Language"),
        sec_ch_ua: request.headers.get("Sec-CH-UA"),
        sec_ch_ua_mobile: request.headers.get("Sec-CH-UA-Mobile"),
        sec_ch_ua_platform: request.headers.get("Sec-CH-UA-Platform"),
        sec_ch_ua_platform_version: request.headers.get("Sec-CH-UA-Platform-Version"),
        sec_ch_width: request.headers.get("Sec-CH-Width"),
        sec_ch_viewport_width: request.headers.get("Sec-CH-Viewport-Width"),
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
    data.sec_ch_ua = request.headers.get("Sec-CH-UA");
    data.sec_ch_ua_mobile = request.headers.get("Sec-CH-UA-Mobile");
    data.sec_ch_ua_platform = request.headers.get("Sec-CH-UA-Platform");
    data.sec_ch_ua_platform_version = request.headers.get("Sec-CH-UA-Platform-Version");
    data.sec_ch_width = request.headers.get("Sec-CH-Width");
    data.sec_ch_viewport_width = request.headers.get("Sec-CH-Viewport-Width");
    return data;
}
