const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Runner = require('./Runner');

const listeningPort = process.env.LISTENING_PORT;
const corsAllowedDomains = process.env.CORS_ALLOWED_DOMAINS.split(',');

const runner = new Runner();
const app = express();
app.use(cors({origin: corsAllowedDomains}));
app.use(bodyParser.json());

app.post('/run', async (req, res) => {
    const { sessionId } = req.body;
    try {
        await runner.run(sessionId);
        res.end();
    }
    catch(err) {
        res.statusCode = 500;
        res.end();
    }
});
app.listen(listeningPort,() => {
    console.log(`Listening on port ${listeningPort}`);
    console.log(`User session will be saved in ${process.env.DATA_PATH}`);
});
