
import React from 'react';
import {createRoot} from "react-dom/client";
import App from './App';

import type {MashroomPortalAppPluginBootstrapFunction} from '@mashroom/mashroom-portal/type-definitions';

const bootstrap: MashroomPortalAppPluginBootstrapFunction = (portalAppHostElement, portalAppSetup, clientServices) => {
    const { appConfig: { orderId }, restProxyPaths: { backend }, lang } = portalAppSetup;
    const { messageBus } = clientServices;

    const root = createRoot(portalAppHostElement);
    root.render(
        <App
            orderId={orderId}
            locale={lang}
            backendApiBasePath={backend}
            messageBus={messageBus}
        />
    );

    return {
        willBeRemoved: () => {
            root.unmount();
        },
    };
};

(global as any).startOrderDetailsApp = bootstrap;
