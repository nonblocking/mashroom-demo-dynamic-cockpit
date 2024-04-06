
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App';

import type {MashroomPortalAppPluginBootstrapFunction} from '@mashroom/mashroom-portal/type-definitions';

const bootstrap: MashroomPortalAppPluginBootstrapFunction = (portalAppHostElement, portalAppSetup, clientServices) => {
    const { appConfig: { openAppsInArea }, restProxyPaths: { backend }, lang } = portalAppSetup;
    const { messageBus, portalAppService } = clientServices;

    const root = createRoot(portalAppHostElement);
    root.render(
        <App
            backendApiBasePath={backend}
            locale={lang}
            messageBus={messageBus}
            portalAppService={portalAppService}
            openAppsInArea={openAppsInArea}
        />
    );

    return {
        willBeRemoved: () => {
            root.unmount();
        },
    };
};

(global as any).startCockpitManagementApp = bootstrap;
