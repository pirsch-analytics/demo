const config = require('dotenv');
const { Pirsch } = require("pirsch-sdk");

async function main() {
    try {
        config.config();

        // Create the client using a client ID and secret.
        const client = new Pirsch({
            hostname: process.env.HOSTNAME,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        });

        // Read the domain for this dashboard.
        const domain = await client.domain();
        console.log(domain);

        // Get the total visitor statistics.
        const stats = await client.totalVisitors({
            id: domain.id,
            from: new Date(2023, 0, 1),
            to: new Date()
        });
        console.log(stats);
    } catch (error) {
        console.error(error);
    }
}

main();
