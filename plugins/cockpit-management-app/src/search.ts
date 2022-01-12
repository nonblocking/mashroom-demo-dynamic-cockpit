
import type {MashroomPortalAppService, MashroomAvailablePortalApp} from "@mashroom/mashroom-portal/type-definitions";
import type {SearchHits, SearchResult} from "mock-backend/type-definitions";
import type {CockpitManagementSearchHits, DisplayApps, SearchHitApp} from "./types";

const LIMIT = 20;

const findStandaloneApps = (query: string, availableCockpitApps: Array<MashroomAvailablePortalApp>): Array<SearchHitApp> => {
    const searchTerms = query.split(' ');
    return availableCockpitApps
        .filter((app) => {
            return [app.name, ...app.metaInfo?.demoCockpit?.utterances?.en || []].some((prop) => searchTerms.some((t) => prop.toLowerCase().indexOf(t) !== -1))
        }).map((app) => ({
            type: 'App',
            data: {
                name: app.name,
                title: app.title || app.name,
                config: {},
            }
        }));
}

const augmentSearchResult = (query: string, hits: SearchHits, availableCockpitApps: Array<MashroomAvailablePortalApp>): CockpitManagementSearchHits => {
    const results: CockpitManagementSearchHits = [];

    results.push(...findStandaloneApps(query, availableCockpitApps));
    hits.forEach((hit) => {
        const entity = hit.type;
        const apps: DisplayApps = availableCockpitApps
            .filter((app) => app.metaInfo?.demoCockpit?.entity === entity)
            .map((app) => {
                const config: any = {};
                if (hit.type === 'Customer') {
                    config.customerId = hit.customerId;
                } else if (hit.type === 'Product') {
                    config.productId = hit.productId;
                }

                return {
                    name: app.name,
                    title: app.title || app.name,
                    config,
                };
            });
        results.push({
            type: entity as any,
            data: hit as any,
            apps,
        });
    });

    return results;
}

export default (query: string, page: number, backendApiBasePath: string, portalAppService: MashroomPortalAppService): Promise<{hits: CockpitManagementSearchHits, total: number}> => {
    return Promise.all([
        fetch(`${backendApiBasePath}/search?q=${query}&skip=${page * LIMIT}&limit=${LIMIT}`, {
            credentials: 'include',
        }).then(res => res.json()),
        portalAppService.getAvailableApps(),
    ]).then(([result, availableAps]) => {
        const searchResult = result as SearchResult;
        const availableCockpitApps = availableAps.filter((app) => !!app.metaInfo?.demoCockpit);
        return {
            hits: augmentSearchResult(query, searchResult.hits, availableCockpitApps),
            total: searchResult.total,
        };
    });
}
