
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import type {MashroomPortalAppPluginBootstrapFunction} from '@mashroom/mashroom-portal/type-definitions';

const bootstrap: MashroomPortalAppPluginBootstrapFunction = (portalAppHostElement, portalAppSetup, clientServices) => {
    const { restProxyPaths: { backend } } = portalAppSetup;
    const { messageBus, portalAppService } = clientServices;

    ReactDOM.render(<App
        backendApiBasePath={backend}
        messageBus={messageBus}
        portalAppService={portalAppService}
    />, portalAppHostElement);

    return {
        willBeRemoved: () => {
            ReactDOM.unmountComponentAtNode(portalAppHostElement);
        },
    };
};

(global as any).startCockpitManagementApp = bootstrap;
