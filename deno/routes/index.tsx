import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers<any> = {
    async GET(req, ctx) {
        ctx.state.track = true;
        return await ctx.render();
    }
};

export default function Home() {
    return (
        <>
            <Head>
                <title>Pirsch Analytics Demo</title>
            </Head>
            <main>
                <p>Hello World!</p>
            </main>
        </>
    );
}
