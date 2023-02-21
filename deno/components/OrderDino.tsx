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

    if (name === "") {
        return "The name must not be empty!";
    } else {
        console.log("New order received", name, dino);
        event(req, ctx, "New Order", [{dino}]);
    }

    return null;
}

export function OrderDino(props: OrderDinoProps) {
    return (
        <>
            <h2>{props.variant === "C" ? "Order Your Dinosaur!" : "Get Your Dino!"}</h2>
            {props.success ? (
                <>
                    <p>Thank you for your order! We will deliver your dinosaur as soon as possible.</p>
                </>
            ) : (
                <>
                    <form method="post">
                    <p>
                        <label for="dino">Dino</label>
                        <select name="dino" id="dino">
                            <option selected={props.dino === "Ankylosaurus"}>Ankylosaurus</option>
                            <option selected={props.dino === "Brachiosaurus"}>Brachiosaurus</option>
                        </select>
                        {props.error ? <span>{props.error}</span> : undefined}
                    </p>
                    <p>
                        <label for="name">Your Name</label>
                        <input type="text" name="name" id="name" />
                    </p>
                    <p>
                        <input type="submit" value="Order Now!" />
                    </p>
                </form>
                </>
            )}
        </>
    );
}
