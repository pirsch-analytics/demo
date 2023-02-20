import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { OrderData, OrderDino, sendOrder } from "../components/OrderDino.tsx";

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
                <base href="/" />
                <title>Get Your Dinosaur!</title>
                <link rel="stylesheet" href="dinorder.css" />
            </Head>
            <main>
                <h1>Dinorder</h1>
                <h2>Order your dinosaur today!</h2>
                <p>
                    <a href="/dinos/ankylosaurus">Get an Ankylosaurus!</a>
                </p>
                <p>
                    <a href="/dinos/brachiosaurus">Get a Brachiosaurus!</a>
                </p>
                <OrderDino success={success} error={error} />
            </main>
        </>
    );
}
