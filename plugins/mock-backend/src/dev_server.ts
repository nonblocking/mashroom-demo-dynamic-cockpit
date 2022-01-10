
import {createServer} from 'http';
import express from 'express';
import cors from 'cors';
import {dummyLoggerFactory as loggerFactory} from '@mashroom/mashroom-utils/lib/logging_utils';
import routes from './routes';

// Dummy context
const pluginContext: any = {
    loggerFactory,
    services: {
        core: {

        }
    }
};

const wrapperApp = express();
const httpServer = createServer(wrapperApp);

wrapperApp.all('*', (req, res, next) => {
    const {origin} = req.headers;

    if (origin) {
        if (origin.indexOf('localhost') !== -1 || origin.indexOf('0.0.0.0') === -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
    }

    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'x-ergo-ws-api-key,content-type,x-ergo-request-id,x-ergo-request-timestamp');
    res.header('Access-Control-Expose-Headers', 'x-ergo-ws-expires');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

wrapperApp.use((req, res, next) => {
    req.pluginContext = pluginContext;
    next();
});

wrapperApp.use('/backend', routes);

httpServer.listen(5566, () => {
    console.log('Dev server started: http://localhost:5566');
});
httpServer.once('error', (error) => {
    console.error('Failed to start server!', error);
});

