
import React, {useState, useEffect, useRef, useCallback, useContext} from 'react';
import {createPortal} from 'react-dom';
import DependencyContext from "../DependencyContext";
import SearchHitCustomer from './SearchHitCustomer';
import SearchHitProduct from './SearchHitProduct';
import SearchEmbeddedApp from './SearchEmbeddedApp';
import search from '../search';

import styles from './SearchPanel.scss'
import {CockpitManagementSearchHits} from "../types";

type Props = {
    open: boolean;
    onClose: () => void;
}

export default ({open, onClose}: Props) => {
    const {backendApiBasePath, portalAppService} = useContext(DependencyContext);
    const [query, setQuery] = useState<string>('');
    const [hits, setHits] = useState<CockpitManagementSearchHits>([]);
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
            search(query, backendApiBasePath, portalAppService).then(
                (hits) => {
                    setLoading(false);
                    setHits(hits);
                },
                (error) => {
                    console.info('Search failed', error);
                    setLoading(false);
                    setHits([]);
                    setError(true);
                }
            );
        } else {
            setHits([]);
        }
    }, [query]);

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
                            hits.map((hit, idx) => {
                                if (hit.type === 'Customer') {
                                    return (
                                        <SearchHitCustomer key={String(idx)} query={query} hit={hit} closeSearch={onClose} />
                                    )
                                } else if (hit.type === 'Product') {
                                    return (
                                        <SearchHitProduct key={String(idx)} query={query} hit={hit} closeSearch={onClose} />
                                    );
                                } else if (hit.type === 'App') {
                                    return <SearchEmbeddedApp key={String(idx)} app={hit.data} closeSearch={onClose} />
                                }
                            })
                        }
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
