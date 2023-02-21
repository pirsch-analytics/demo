import { Handlers } from "$fresh/server.ts";
import { DinoSelection } from "../components/DinoSelection.tsx";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { Menu } from "../components/Menu.tsx";
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

interface HomeData extends OrderData {
    selectionVariant?: string
    orderVariant?: string
}

export default function Home({data}: PageProps<HomeData>) {
    const {selectionVariant, orderVariant, success, error} = data;

    return (
        <>
            <Header title="Ordino - The best dinosour shop" />
            <Menu />
            <main>
                <h1>The best dinosaurs since 245,000,000 B.C.</h1>
                <DinoSelection variant={selectionVariant} />
                <OrderDino variant={orderVariant} success={success} error={error} />
            </main>
            <Footer />
        </>
    );
}
