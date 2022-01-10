import type {DependencyContext, DisplayApp} from "./types";

export default (app: DisplayApp, context: DependencyContext): Promise<void> => {
    const {openAppsInArea, portalAppService} = context;

    return portalAppService.loadApp(openAppsInArea,app.name, undefined, 0, {
       ...app.config,
    }).then((app) => {

        // TODO: add close icon
        // TODO: add move icon

        return;
    })
}
