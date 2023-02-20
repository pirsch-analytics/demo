import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { OrderData, OrderDino, sendOrder } from "../../components/OrderDino.tsx";

export const handler: Handlers<any> = {
    async GET(req, ctx) {
        ctx.state.track = true;
        return await ctx.render({});
    },
    async POST(req, ctx) {
        const error = sendOrder(req, ctx);
        
        if (error) {
            return ctx.render({error});
        }

        return ctx.render({success: true});
    }
};

export default function Home({data}: PageProps<OrderData>) {
    const {success, error} = data;

    return (
        <>
            <Head>
                <title>Ankylosaurus</title>
            </Head>
            <main>
                <p>Get a Ankylosaurus!</p>
                <OrderDino dino="Ankylosaurus" success={success} error={error} />
            </main>
        </>
    );
}
