import { Handlers, PageProps } from "$fresh/server.ts";
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
            return ctx.render({
                selectionVariant: ctx.state.selectionVariant,
                orderVariant: ctx.state.orderVariant,
                success: true
            });
        } catch (error) {
            return ctx.render({
                selectionVariant: ctx.state.selectionVariant,
                orderVariant: ctx.state.orderVariant,
                error
            });
        }
    }
};

interface BrachiosaurusData extends OrderData {
    orderVariant?: string
}

export default function Brachiosaurus({data}: PageProps<BrachiosaurusData>) {
    const {orderVariant, success, error} = data;

    return (
        <>
            <Header title="Brachiosaurus" />
            <Menu />
            <main>
                <a href="/">Back</a>
                <h1>Get a Brachiosaurus!</h1>
                <img src="brachiosaurus.png" alt="Ankylosaurus" />
                <OrderDino variant={orderVariant} dino={"Brachiosaurus"} success={success} error={error} />
            </main>
            <Footer />
        </>
    );
}
