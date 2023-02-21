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
                <p>Ankylosaurus is a genus of armored dinosaur. Its fossils have been found in geological formations dating to the very end of the Cretaceous Period, about 68–66 million years ago, in western North America, making it among the last of the non-avian dinosaurs. It was named by Barnum Brown in 1908; it is monotypic, containing only A. magniventris. The generic name means "fused" or "bent lizard", and the specific name means "great belly".</p>
                <p>Ankylosaurus was the largest-known ankylosaurine dinosaur and possibly the largest ankylosaurid. In 2004 Carpenter estimated that the individual with the largest-known skull, which is 64.5cm long and 74.5cm wide, was about 6.25m long and had a hip height of about 1.7m.</p>
                <img src="ankylosaurus.png" alt="Ankylosaurus" style="width: 100%;" />
                <span style="display: block; text-align: center;">emilywilloughby.com (CC BY-SA 3.0)</span>
                <OrderDino variant={orderVariant} dino="Ankylosaurus" success={success} error={error} />
            </main>
            <Footer />
        </>
    );
}
