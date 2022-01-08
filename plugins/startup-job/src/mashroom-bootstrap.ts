
import {nanoid} from 'nanoid';

import type {MashroomPluginContext} from '@mashroom/mashroom/type-definitions';
import type {MashroomPortalService, MashroomPortalPage, MashroomPortalAppInstance} from '@mashroom/mashroom-portal/type-definitions';
import type {MashroomBackgroundJobPluginBootstrapFunction} from '@mashroom/mashroom-background-jobs/type-definitions';
import {MashroomPortalPageRef} from "@mashroom/mashroom-portal/type-definitions/api";

let executed = false;

const backgroundJob = (pluginContext: MashroomPluginContext) => {
    const logger = pluginContext.loggerFactory('demo.startupJob');
    const portalService: MashroomPortalService = pluginContext.services.portal.service;

    // Only once
    if (executed) {
        return;
    }
    executed = true;

    setTimeout(async () => {
        // TODO

        const sites = await portalService.getSites();
        const defaultSite = sites[0];

        const cockpitExists = defaultSite.pages.find(({pageId}) => pageId === 'cockpit');
        if (!cockpitExists) {

            const cockpitManagerAppInstance: MashroomPortalAppInstance = {
                pluginName: 'Mashroom Dynamic Cockpit Demo Cockpit Management App',
                instanceId: nanoid(8),
            };

            const pageCockpit: MashroomPortalPage = {
                pageId: 'cockpit',
                description: 'Mashroom Cockpit Demo',
                layout: 'Mashroom Portal Default Layouts 2 Columns with 1 Column Header',
                extraCss: `
#navigation {
    display: none;
}

.portal-app-mashroom-dynamic-cockpit-demo-cockpit-management-app {
    box-shadow: none;
}

.portal-app-mashroom-dynamic-cockpit-demo-cockpit-management-app .mashroom-portal-app-header {
    display: none !important;
}
                `,
                portalApps: {
                    'app-area1': [{
                        pluginName: cockpitManagerAppInstance.pluginName,
                        instanceId: cockpitManagerAppInstance.instanceId,
                    }],
                    'app-area2': [],
                    'app-area3': [],
                },
            };

            const pageRefCockpit: MashroomPortalPageRef = {
                pageId: 'cockpit',
                title: 'Cockpit Demo',
                friendlyUrl: '/cockpit',
            }

            defaultSite.pages.splice(1, 0, pageRefCockpit);

            await portalService.insertPortalAppInstance(cockpitManagerAppInstance);
            await portalService.insertPage(pageCockpit);
            await portalService.updateSite(defaultSite);
        }
    }, 2000);
};

const bootstrap: MashroomBackgroundJobPluginBootstrapFunction = () => {
    return backgroundJob;
};

export default bootstrap;
