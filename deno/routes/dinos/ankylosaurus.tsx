import { Handlers } from "$fresh/server.ts";
import { Footer } from "../../components/Footer.tsx";
import { Header } from "../../components/Header.tsx";
import { Menu } from "../../components/Menu.tsx";
import { OrderData, OrderDino, sendOrder } from "../../components/OrderDino.tsx";

export const handler: Handlers<any> = {
    async GET(req, ctx) {
        ctx.state.track = true;
        return await ctx.render({
            orderVariant: ctx.state.orderVariant
        });
    },
    async POST(req, ctx) {
        try {
            await sendOrder(req, ctx);
            return ctx.render({success: true});
        } catch (error) {
            return ctx.render({error});
        }
    }
};

interface AnkylosaurusData extends OrderData {
    orderVariant?: string
}

export default function Ankylosaurus({data}: PageProps<AnkylosaurusData>) {
    const {orderVariant, success, error} = data;

    return (
        <>
            <Header title="Ankylosaurus" />
            <Menu />
            <main>
                <h1>Get an Ankylosaurus!</h1>
                <img src="ankylosaurus.png" alt="Ankylosaurus" style="width: 100%;" />
                <OrderDino variant={orderVariant} dino="Ankylosaurus" success={success} error={error} />
            </main>
            <Footer />
        </>
    );
}
