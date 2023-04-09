const config = require('dotenv').config();
const { Pirsch } = require("pirsch-sdk");

async function main() {
    try {
        const client = new Pirsch({
            hostname: process.env.HOSTNAME,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        });

        const domain = await client.domain();
        console.log(domain);

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
