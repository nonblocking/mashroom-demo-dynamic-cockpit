
import {nanoid} from 'nanoid';

import type {MashroomPluginContext} from '@mashroom/mashroom/type-definitions';
import type {MashroomPortalService, MashroomPortalPage, MashroomPortalAppInstance} from '@mashroom/mashroom-portal/type-definitions';
import type {MashroomBackgroundJobPluginBootstrapFunction} from '@mashroom/mashroom-background-jobs/type-definitions';
import {MashroomPortalPageRef} from '@mashroom/mashroom-portal/type-definitions/api';

// This will run only once during startup
const backgroundJob = (pluginContext: MashroomPluginContext) => {
    const logger = pluginContext.loggerFactory('demo.startupJob');
    const portalService: MashroomPortalService = pluginContext.services.portal.service;

    setTimeout(async () => {
        const sites = await portalService.getSites();
        const defaultSite = sites[0];

        const cockpitExists = defaultSite.pages.find(({pageId}) => pageId === 'cockpit');
        if (!cockpitExists) {
            logger.info('Setting up cockpit page');

            const cockpitManagerAppInstance: MashroomPortalAppInstance = {
                pluginName: 'Mashroom Dynamic Cockpit Demo Cockpit Management App',
                instanceId: nanoid(8),
            };

            const pageCockpit: MashroomPortalPage = {
                pageId: 'cockpit',
                description: 'Mashroom Cockpit Demo',
                layout: 'Mashroom Portal Default Layouts 2 Columns with 1 Column Header',
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
