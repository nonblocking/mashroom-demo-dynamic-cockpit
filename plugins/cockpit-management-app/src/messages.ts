import type {MashroomPortalMessageBus} from "@mashroom/mashroom-portal/type-definitions";
import type {DependencyContext} from "./types";
import openApp from "./openApp";

let handler: ((data: any) => void) | undefined;

export const subscribeToOpenAppMessage = (messageBus: MashroomPortalMessageBus, context: DependencyContext) => {
    if (!handler) {
        handler = (data: any) => {
            openApp(data, context);
        };
    }
    messageBus.subscribe('DEMO_COCKPIT_OPEN_APP', handler);
}

export const unsubscribeToOpenAppMessage = (messageBus: MashroomPortalMessageBus) => {
    if (handler) {
        messageBus.unsubscribe('DEMO_COCKPIT_OPEN_APP', handler);
    }
}
