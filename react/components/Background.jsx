import React from 'react';

export default function Background({ name, site }) {
    return <img
        className="background"
        src={site.backgrounds[name] ?? `/public/images/defaults/${name}.jpg`}
        alt={`website ${name} background`}/>
}