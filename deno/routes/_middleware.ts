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
    
    if (ctx.state.track) {
        pageView(req, ctx);
    }

    return resp;
}
