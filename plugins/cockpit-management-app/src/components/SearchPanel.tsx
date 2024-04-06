
import React, {useState, useEffect, useRef, useCallback, useContext} from 'react';
import {createPortal} from 'react-dom';
import DependencyContext from "../DependencyContext";
import SearchHitCustomer from './SearchHitCustomer';
import SearchHitProduct from './SearchHitProduct';
import SearchEmbeddedApp from './SearchEmbeddedApp';
import search from '../search';

import type {CockpitManagementSearchHits} from "../types";

import styles from './SearchPanel.scss'

type Props = {
    open: boolean;
    onClose: () => void;
}

export default ({open, onClose}: Props) => {
    const {backendApiBasePath, portalAppService, locale} = useContext(DependencyContext);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const [hits, setHits] = useState<CockpitManagementSearchHits>([]);
    const [totalHits, setTotalHits] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const closeOnEsc = useCallback((event: KeyboardEvent) => {
        if(event.key === 'Escape') {
            onClose();
        }
    }, []);
    useEffect(() => {
        if (open) {
            setQuery('');
            document.addEventListener('keydown', closeOnEsc);
            searchInputRef.current?.focus();
        } else {
            document.removeEventListener('keydown', closeOnEsc);
        }
    }, [open]);
    useEffect(() => {
        if (query.length > 2) {
            setLoading(true);
            setError(false);
            setPage(0);
            setTotalHits(0);
            search(query, 0, locale, backendApiBasePath, portalAppService).then(
                (result) => {
                    setLoading(false);
                    setHits(result.hits);
                    setTotalHits(result.total);
                },
                (error) => {
                    console.error('Search failed', error);
                    setLoading(false);
                    setHits([]);
                    setError(true);
                }
            );
        } else {
            setHits([]);
        }
    }, [query]);
    useEffect(() => {
        if (page > 0) {
            search(query, page, locale, backendApiBasePath, portalAppService).then(
                (result) => {
                    setHits([...hits, ...result.hits])
                },
                (error) => {
                    console.error('Search failed', error);
                }
            );
        }
    }, [page]);

    if (!open) {
        return null;
    }

    return createPortal((
        <div className={`mashroom-portal-app-wrapper ${styles.SearchPanel}`}>
            <div className={styles.CloseButton} onClick={onClose} />
            <div className={styles.SearchBar}>
                <input
                    type="search"
                    placeholder="Search customers, products, apps, ..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    ref={searchInputRef}
                />
            </div>
            <div className={styles.SearchResults}>
                {hits.length > 0 && (
                    <div className={styles.SearchHits}>
                        {
                            hits.map((hit) => {
                                if (hit.type === 'Customer') {
                                    return (
                                        <SearchHitCustomer key={`c_${hit.data.customerId}`} query={query} hit={hit} closeSearch={onClose} />
                                    )
                                } else if (hit.type === 'Product') {
                                    return (
                                        <SearchHitProduct key={`p_${hit.data.productId}`} query={query} hit={hit} closeSearch={onClose} />
                                    );
                                } else if (hit.type === 'App') {
                                    return (
                                        <SearchEmbeddedApp key={`a_${hit.data.name}`} app={hit.data} closeSearch={onClose} />
                                    );
                                }
                            })
                        }
                        {hits.length < totalHits && (
                            <div className={styles.ShowMore}>
                                <a href="javascript:void(0)" onClick={() => setPage(page + 1)}>Show more...</a>
                            </div>
                        )}
                    </div>
                )}
                {loading && hits.length === 0 && (
                    <div className="mashroom-portal-app-loading">
                        <span />
                    </div>
                )}
                {error && (
                    <div className="mashroom-portal-app-loading-error ">
                        Search failed
                    </div>
                )}
            </div>
        </div>
    ), document.body);
};
