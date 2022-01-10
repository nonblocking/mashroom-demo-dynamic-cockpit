import React from 'react';

type Props = {
    text: string;
    query: string;
}

export default ({text, query}: Props) => {
    const terms = query.split(' ');
    let highlighted = text;
    terms.forEach((term) => highlighted = highlighted.replace(new RegExp(term, 'ig'), (str) => {
        return `<mark>${str}</mark>`;
    }));

    return (
        <span dangerouslySetInnerHTML={{__html: highlighted}} />
    );
};
