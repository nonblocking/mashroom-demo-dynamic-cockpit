
import React from 'react';
import {createRoot} from "react-dom/client";
import App from './App';

import type {MashroomPortalAppPluginBootstrapFunction} from '@mashroom/mashroom-portal/type-definitions';

const bootstrap: MashroomPortalAppPluginBootstrapFunction = (portalAppHostElement, portalAppSetup, clientServices) => {
    const { appConfig: { customerId }, restProxyPaths: { backend } } = portalAppSetup;
    const { messageBus } = clientServices;

    const root = createRoot(portalAppHostElement);
    root.render(
        <App
            customerId={customerId}
            messageBus={messageBus}
            backendApiBasePath={backend}
        />
    );

    return {
        willBeRemoved: () => {
            root.unmount();
        },
    };
};

(global as any).startCustomerDetailsApp = bootstrap;
