import config from "../deno.json" assert { type: "json" };
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { Pirsch } from "npm:pirsch-sdk";

const client = new Pirsch({
    hostname: config.pirsch.hostname,
    protocol: config.pirsch.protocol,
    accessToken: config.pirsch.accessToken
});

interface State {
    track: boolean;
}

export async function handler(
    req: Request,
    ctx: MiddlewareHandlerContext<State>,
) {
    const resp = await ctx.next();
    
    if (ctx.state.track) {
        client.hit(client.hitFromRequest({
            url: req.url,
            socket: {
                remoteAddress: config.pirsch.ip ?? ctx.remoteAddr.hostname ?? ""
            },
            headers: {
                dnt: req.headers.get("dnt"),
                "user-agent": req.headers.get("user-agent"),
                "accept-language": req.headers.get("accept-language"),
                "referer": req.headers.get("referer")
            }
        })).catch(e => {
            console.error("Error sending page view to Pirsch", e);
        });
    }

    return resp;
}
