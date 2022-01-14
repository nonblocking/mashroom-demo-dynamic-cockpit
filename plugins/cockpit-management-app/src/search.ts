
import availableCockpitApps from "./availableCockpitApps";

import type {MashroomPortalAppService, MashroomAvailablePortalApp} from "@mashroom/mashroom-portal/type-definitions";
import type {SearchHits, SearchResult} from "mock-backend/type-definitions";
import type {CockpitManagementSearchHits, DisplayApps, SearchHitApp} from "./types";

const LIMIT = 20;

const findStandaloneApps = (query: string, availableCockpitApps: Array<MashroomAvailablePortalApp>, locale: string): Array<SearchHitApp> => {
    const searchTerms = query.split(' ');
    return availableCockpitApps
        .filter((app) => {
            if (app.metaInfo?.demoCockpit?.viewType !== 'Standalone') {
                return false;
            }
            const utterances = app.metaInfo?.demoCockpit?.utterances?.[locale] || app.metaInfo?.demoCockpit?.utterances?.en || [];
            return [app.name, ...utterances].some((prop) => searchTerms.some((t) => prop.toLowerCase().indexOf(t) !== -1))
        }).map((app) => ({
            type: 'App',
            data: {
                name: app.name,
                title: app.title || app.name,
                config: {},
            }
        }));
}

const augmentSearchResult = (query: string, hits: SearchHits, availableCockpitApps: Array<MashroomAvailablePortalApp>, locale: string): CockpitManagementSearchHits => {
    const results: CockpitManagementSearchHits = [];

    results.push(...findStandaloneApps(query, availableCockpitApps, locale));
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

export default (query: string, page: number, locale: string, backendApiBasePath: string, portalAppService: MashroomPortalAppService): Promise<{hits: CockpitManagementSearchHits, total: number}> => {
    return Promise.all([
        fetch(`${backendApiBasePath}/search?q=${query}&skip=${page * LIMIT}&limit=${LIMIT}`, {
            credentials: 'include',
        }).then(res => res.json()),
        availableCockpitApps(portalAppService),
    ]).then(([result, availableCockpitApps]) => {
        const searchResult = result as SearchResult;
        return {
            hits: augmentSearchResult(query, searchResult.hits, availableCockpitApps, locale),
            total: searchResult.total,
        };
    });
}
