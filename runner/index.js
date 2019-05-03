const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Runner = require('./runner');
const configEnvOverrides = require('./configEnvOverrides');

const defaultConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, `config.yaml`), 'utf8'));
const config = configEnvOverrides(defaultConfig);
const runner = new Runner(config);

const app = express();
app.use(cors({origin: ['https://www.pearcode.it', 'http://localhost:3000']}));
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

app.listen(config.port);
