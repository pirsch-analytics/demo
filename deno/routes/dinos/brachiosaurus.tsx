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
                <h1>Get a Brachiosaurus!</h1>
                <p>Brachiosaurus is a genus of sauropod dinosaur that lived in North America during the Late Jurassic, about 154 to 150 million years ago. It was first described by American paleontologist Elmer S. Riggs in 1903 from fossils found in the Colorado River valley in western Colorado, United States.</p>
                <p>Like all sauropod dinosaurs, Brachiosaurus was a quadruped with a small skull, a long neck, a large trunk with a high-ellipsoid cross section, a long, muscular tail and slender, columnar limbs. Large air sacs connected to the lung system were present in the neck and trunk, invading the vertebrae and ribs by bone resorption, greatly reducing the overall density of the body.</p>
                <img src="brachiosaurus.png" alt="Ankylosaurus" style="width: 100%;" />
                <OrderDino variant={orderVariant} dino={"Brachiosaurus"} success={success} error={error} />
            </main>
            <Footer />
        </>
    );
}
