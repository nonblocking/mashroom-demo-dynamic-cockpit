
import type {MashroomPortalAppService, MashroomPortalMessageBus} from "@mashroom/mashroom-portal/type-definitions";
import type {SearchHitCustomer, SearchHitProduct} from "mock-backend/type-definitions";

export type CockpitManagementSearchHit = AugmentedSearchHitCustomer | AugmentedSearchHitProduct | SearchHitApp;
export type CockpitManagementSearchHits = Array<CockpitManagementSearchHit>;

export type DependencyContext = {
    backendApiBasePath: string;
    locale: string;
    messageBus: MashroomPortalMessageBus;
    portalAppService: MashroomPortalAppService;
    openAppsInArea: string;
}

export type DisplayApp = {
    title: string;
    name: string;
    config: any;
}

export type DisplayApps = Array<DisplayApp>;

export type AugmentedSearchHitCustomer = {
    type: 'Customer';
    data: SearchHitCustomer;
    apps: DisplayApps;
}

export type AugmentedSearchHitProduct = {
    type: 'Product';
    data: SearchHitProduct;
    apps: DisplayApps;
}

export type SearchHitApp = {
    type: 'App';
    data: DisplayApp;
}

