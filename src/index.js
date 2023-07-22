const fs = require('fs');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const { appRouter } = require('./router/app.router');

const app = express();

app.use(helmet());
app.use(express());
app.use(appRouter);

const PORT = 3000;

const server = https.createServer({
	cert: fs.readFileSync('./resources/cert.pem'),
	key: fs.readFileSync('./resources/key.pem'),
}, app)

server.listen(PORT, () => console.log(`[VirtuLife] Server started on port ${PORT}`));