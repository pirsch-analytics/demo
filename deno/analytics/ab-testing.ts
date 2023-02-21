import { getCookies, setCookie } from "https://deno.land/std@0.177.0/http/cookie.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { event } from "../analytics/pirsch.ts";

export function initABTesting(
    req: Request,
    ctx: MiddlewareHandlerContext
) {
    const cookie = getCookies(req.headers)["ab-testing"];

    if (!cookie) {
        const selection = Math.random() < 0.5 ? "A" : "B";
        const orderForm = Math.random() < 0.5 ? "C" : "D";
        const variants = {selection, orderForm};
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        const headers = new Headers();
        setCookie(headers, {
            name: "ab-testing",
            value: `selection:${selection}|orderForm:${orderForm}`,
            expires,
            maxAge: 60*60*24,
            path: "/",
            httpOnly: true,
            sameSite: "Strict"
        });
        event(req, ctx, "A/B-Testing", variants);
        return {variants, headers};
    }

    return null;
}

export function getVariant(req: Request, name: "selection" | "orderForm") {
    try {
        const cookie = getCookies(req.headers)["ab-testing"];

        if (!cookie) {
            return null;
        }

        const variants = cookie.split("|");
        
        for (const variant of variants) {
            const [key, value] = variant.split(":");

            if (key === name) {
                return value;
            }
        }

        return null;
    } catch {
        return null;
    }
}
