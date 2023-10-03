import { Pirsch } from "pirsch-sdk/web";

async function main() {
    try {
        // Create the client using the identification code.
        const client = new Pirsch({
            //baseUrl: "https://localhost.com:9999",
            identificationCode: ""
        });

        // Send a page view.
        await client.hit();

        // Send an event.
        await client.event("Custom Event 2", 0, {
            meta_data: "field"
        });
    } catch (error) {
        console.error(error);
    }
}

main();
