import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { pageView, event } from "../analytics/pirsch.ts";

interface State {
    track: boolean;
}

export async function handler(
    req: Request,
    ctx: MiddlewareHandlerContext<State>,
) {
    const resp = await ctx.next();

    // TODO check and set A/B testing cookie and send event once!
    
    if (ctx.state.track) {
        pageView(req, ctx);
    }

    return resp;
}
