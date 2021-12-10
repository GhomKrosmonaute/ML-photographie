import React from 'react';

export default function Embed({ site }) {
    return (
        <>
            <meta property="og:title" content={site.name} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={site.name} />
            <meta property="og:description" content={site.description} />
            <meta property="og:url" content={site.url} />

            <meta property="og:image" content={site.backgrounds["primary"]} />
            <!--<meta property="og:image:width" content="300"/>-->
            <!--<meta property="og:image:height" content="300"/>-->
            <!--<meta property="og:image" content="https://raw.githubusercontent.com/CamilleAbella/CamilleAbella.github.io/master/img/meta.png"/>-->
        </>
    )
}