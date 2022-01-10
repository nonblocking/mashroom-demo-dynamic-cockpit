import React from 'react';
import SearchHit from "./SearchHit";
import Highlight from "./Highlight";

import type {AugmentedSearchHitCustomer} from "../types";

type Props = {
    query: string;
    hit: AugmentedSearchHitCustomer;
    closeSearch: () => void;
}

export default ({query, hit, closeSearch}: Props) => {
    const {firstName, lastName, suffix, prefix, birthDate, streetAddress, city, zipCode} = hit.data;
    const header = (
        <div>
            <span>{prefix}</span>
            &nbsp;
            <Highlight query={query} text={firstName} />
            &nbsp;
            <Highlight query={query} text={lastName} />
            &nbsp;
            <span>{suffix}</span>
        </div>
    );
    const subHeader = (
        <div>
            <em>Birthdate:</em>
            &nbsp;
            <span>{birthDate.substring(0, 10)}</span>
            &nbsp;
            <em>Address:</em>
            &nbsp;
            <span>{streetAddress}</span>
            &nbsp;
            <span>{zipCode}</span>
            &nbsp;
            <span>{city}</span>
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
