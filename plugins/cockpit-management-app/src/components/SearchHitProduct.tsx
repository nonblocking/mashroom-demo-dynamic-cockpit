import React, {useContext} from 'react';
import DependencyContext from "../DependencyContext";
import SearchHit from "./SearchHit";
import Highlight from "./Highlight";

import type {AugmentedSearchHitProduct} from "../types";

type Props = {
    query: string;
    hit: AugmentedSearchHitProduct;
    closeSearch: () => void;
}

export default ({query, hit, closeSearch}: Props) => {
    const {locale} = useContext(DependencyContext);
    const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' });

    const {name, price, color, material} = hit.data;
    const header = (
        <div>
            <Highlight query={query} text={name} />
        </div>
    );
    const subHeader = (
        <div>
            <em>Color:</em>
            &nbsp;
            <Highlight query={query} text={color} />
            &nbsp;
            <em>Material:</em>
            &nbsp;
            <Highlight query={query} text={material} />
            &nbsp;
            <em>Price:</em>
            &nbsp;
            <span>{numberFormat.format(price)}</span>
        </div>
    );

    return (
        <SearchHit
            type={hit.type}
            header={header}
            subHeader={subHeader}
            apps={hit.apps}
            closeSearch={closeSearch}
        />
    );
}
