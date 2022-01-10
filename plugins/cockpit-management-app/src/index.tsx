
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import type {MashroomPortalAppPluginBootstrapFunction} from '@mashroom/mashroom-portal/type-definitions';

const bootstrap: MashroomPortalAppPluginBootstrapFunction = (portalAppHostElement, portalAppSetup, clientServices) => {
    const { appConfig: { openAppsInArea }, restProxyPaths: { backend }, lang } = portalAppSetup;
    const { messageBus, portalAppService } = clientServices;

    ReactDOM.render(<App
        backendApiBasePath={backend}
        locale={lang}
        messageBus={messageBus}
        portalAppService={portalAppService}
        openAppsInArea={openAppsInArea}
    />, portalAppHostElement);

    return {
        willBeRemoved: () => {
            ReactDOM.unmountComponentAtNode(portalAppHostElement);
        },
    };
};

(global as any).startCockpitManagementApp = bootstrap;
