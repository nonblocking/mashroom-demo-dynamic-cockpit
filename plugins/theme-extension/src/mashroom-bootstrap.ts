import {MashroomPortalPageEnhancementPluginBootstrapFunction} from '@mashroom/mashroom-portal/type-definitions';

const bootstrap: MashroomPortalPageEnhancementPluginBootstrapFunction = () => {
    return {
        rules: {
            onlyOnCockpitPage: (sitePath, pageFriendlyUrl) => pageFriendlyUrl.indexOf('/cockpit') !== -1,
        }
    }
};

export default bootstrap;
