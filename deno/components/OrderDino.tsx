import { event } from "../analytics/pirsch.ts";

export interface OrderData {
    success?: boolean
    error?: string
}

interface OrderDinoProps {
    variant?: string
    dino?: string
    success?: boolean
    error?: string
}

export async function sendOrder(req, ctx) {
    const formData = await req.formData();
    const dino = formData.get("dino");
    const name = formData.get("name").trim();

    if (!name) {
        return Promise.reject("The name must not be empty!");
    } else {
        console.log("New order received", name, dino);
        event(req, ctx, "New Order", {dino, variant: ctx.state.orderVariant});
    }

    return Promise.resolve();
}

export function OrderDino(props: OrderDinoProps) {
    return (
        <>
            <h2>{props.variant === "C" ? "Order your Dinosaur today!" : "Get your Dinosaur!"}</h2>
            {props.success ? (
                <>
                    <p>Thank you for your order! We will deliver your dinosaur as soon as possible.</p>
                </>
            ) : (
                <>
                    <form method="post">
                        <div class="row">
                            <fieldset>
                                <label for="dino">Type of dinosaur</label>
                                <select name="dino" id="dino">
                                    <option selected={props.dino === "Ankylosaurus"}>Ankylosaurus</option>
                                    <option selected={props.dino === "Brachiosaurus"}>Brachiosaurus</option>
                                </select>
                            </fieldset>
                            <fieldset>
                                <label for="name">Your name</label>
                                <input type="text" name="name" id="name" />
                                {props.error ? <span class="error">{props.error}</span> : undefined}
                            </fieldset>
                        </div>
                        <input type="submit" value="Order now!" />
                    </form>
                </>
            )}
        </>
    );
}
