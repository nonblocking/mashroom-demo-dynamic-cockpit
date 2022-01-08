
import {createServer} from 'http';
import express from 'express';
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

