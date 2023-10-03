import { Pirsch } from "pirsch-sdk/web";

async function main() {
    try {
        // Create the client using the identification code.
        const client = new Pirsch({
            identificationCode: "",

            // Only required for proxies and testing.
            //baseUrl: "https://localhost.com:9999",
        });

        // Send a page view.
        await client.hit();

        // Send an event.
        await client.event("Custom Event", 0, {
            meta_data: "field"
        });
    } catch (error) {
        console.error(error);
    }
}

main();
