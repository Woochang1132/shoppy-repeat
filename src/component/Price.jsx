import React from 'react';

export default function Price({text, price}) {
    return (
        <div>
            <p>{text}</p>
            <p>￦{price}</p>
        </div>
    );
}

