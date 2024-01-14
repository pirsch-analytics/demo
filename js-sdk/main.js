const config = require('dotenv');
const { Pirsch } = require("pirsch-sdk");

async function main() {
    try {
        config.config();

        // Create the client using a client ID and secret.
        const client = new Pirsch({
            hostname: process.env.HOSTNAME,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            
            // Only required for proxies and testing.
            //baseUrl: "https://localhost.com:9999",
        });

        console.log("Reading the domain.");
        const domain = await client.domain();
        console.log(domain);
        console.log("----------------------------");

        console.log("Getting the total visitor statistics.");
        const visitorStats = await client.totalVisitors({
            id: domain.id,
            from: new Date(2023, 0, 1),
            to: new Date()
        });
        console.log(visitorStats);
        console.log("----------------------------");

        console.log("Getting page statistics for today.");
        const pageStats = await client.pages({
            id: domain.id,
            from: new Date(),
            to: new Date()
        });
        console.log(pageStats);
        console.log("----------------------------");

        console.log("Getting event metadata.");
        const eventMetadataStats = await client.eventMetadata({
            id: domain.id,
            from: new Date(),
            to: new Date(),
            event: "Registration",
            event_meta_key: "affiliate"
        });
        console.log(eventMetadataStats);
        console.log("----------------------------");

        console.log("Getting event list.");
        const eventList = await client.listEvents({
            id: domain.id,
            from: new Date(),
            to: new Date()
        });
        console.log(eventList);
    } catch (error) {
        console.error(error);
    }
}

main();
