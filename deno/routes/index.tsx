import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { DinoSelection } from "../components/DinoSelection.tsx";
import { OrderData, OrderDino, sendOrder } from "../components/OrderDino.tsx";

export const handler: Handlers<any> = {
    async GET(req, ctx) {
        ctx.state.track = true;
        return await ctx.render({
            selectionVariant: ctx.state.selectionVariant,
            orderVariant: ctx.state.orderVariant
        });
    },
    async POST(req, ctx) {
        const error = sendOrder(req, ctx);
        
        if (error) {
            return ctx.render({error});
        }

        return ctx.render({success: true});
    }
};

interface HomeData extends OrderData {
    selectionVariant?: string
    orderVariant?: string
}

export default function Home({data}: PageProps<HomeData>) {
    const {selectionVariant, orderVariant, success, error} = data;

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
                <DinoSelection variant={selectionVariant} />
                <OrderDino variant={orderVariant} success={success} error={error} />
            </main>
        </>
    );
}
