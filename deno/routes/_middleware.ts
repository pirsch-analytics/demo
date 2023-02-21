import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { initABTesting, getVariant } from "../analytics/ab-testing.ts";
import { pageView } from "../analytics/pirsch.ts";

interface State {
    track: boolean;
}

export async function handler(
    req: Request,
    ctx: MiddlewareHandlerContext<State>
) {
    const abTest = initABTesting(req, ctx);
    ctx.state.selectionVariant = getVariant(req, "selection") ?? abTest.variants["selection"];
    ctx.state.orderVariant = getVariant(req, "orderForm") ?? abTest.variants["orderForm"];
    const resp = await ctx.next();

    if (abTest) {
        for (const [key, value] of abTest.headers.entries()) {
            resp.headers.append(key, value);
        }
    }
    
    if (ctx.state.track) {
        pageView(req, ctx);
    }

    return resp;
}
