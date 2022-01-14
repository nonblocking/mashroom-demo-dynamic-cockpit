import type {MashroomAvailablePortalApp, MashroomPortalAppService} from "@mashroom/mashroom-portal/type-definitions";

const EXTRA_COCKPIT_APPS = [{
    name: 'Mashroom Demo Remote Portal App',
    metaInfo: {
        demoCockpit: {
            viewType: 'Standalone',
            utterances: {
                'en': [
                    'Chuck Norris',
                ]
            }
        }
    }
}];

export default (portalAppService: MashroomPortalAppService): Promise<Array<MashroomAvailablePortalApp>> => {
    return portalAppService.getAvailableApps().then((availableApps) => {
        const cockpitApps = availableApps.filter((app) => !!app.metaInfo?.demoCockpit);
        EXTRA_COCKPIT_APPS.forEach((extraApp) => {
            const availableExtraApp = availableApps.find(({name}) => name === extraApp.name);
            if (availableExtraApp) {
                cockpitApps.push({
                    ...availableExtraApp,
                    metaInfo: extraApp.metaInfo,
                });
            }
        });
        return cockpitApps;
    });
}
