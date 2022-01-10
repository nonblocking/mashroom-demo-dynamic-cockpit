
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import type {MashroomPortalAppPluginBootstrapFunction} from '@mashroom/mashroom-portal/type-definitions';

const bootstrap: MashroomPortalAppPluginBootstrapFunction = (portalAppHostElement, portalAppSetup, clientServices) => {
    const { appConfig: { customerId }, restProxyPaths: { backend }, lang } = portalAppSetup;
    const { messageBus } = clientServices;

    ReactDOM.render(<App
        customerId={customerId}
        locale={lang}
        messageBus={messageBus}
        backendApiBasePath={backend}
    />, portalAppHostElement);

    return {
        willBeRemoved: () => {
            ReactDOM.unmountComponentAtNode(portalAppHostElement);
        },
    };
};

(global as any).startCustomerOrdersApp = bootstrap;
