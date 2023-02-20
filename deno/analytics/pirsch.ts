import config from "../deno.json" assert { type: "json" };
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { Pirsch } from "npm:pirsch-sdk";

export const client = new Pirsch({
    hostname: config.pirsch.hostname,
    protocol: config.pirsch.protocol,
    accessToken: config.pirsch.accessToken
});

export function pageView(
    req: Request,
    ctx: MiddlewareHandlerContext
) {
    client.hit(client.hitFromRequest(toPirschRequest(req, ctx))).catch(e => {
        console.error("Error sending page view to Pirsch", e);
    });
}

export function event(
    req: Request,
    ctx: MiddlewareHandlerContext,
    name: string,
    meta?: Record<string, string>[],
    duration?: number
) {
    client.event(name, client.hitFromRequest(toPirschRequest(req, ctx)), duration, meta).catch(e => {
        console.error("Error sending event to Pirsch", e);
    });
}

function toPirschRequest(
    req: Request,
    ctx: MiddlewareHandlerContext
) {
    return {
        url: req.url,
        socket: {
            remoteAddress: ctx.remoteAddr.hostname
        },
        headers: {
            dnt: req.headers.get("dnt"),
            "user-agent": req.headers.get("user-agent"),
            "accept-language": req.headers.get("accept-language"),
            referer: req.headers.get("referer")
        }
    };
}
