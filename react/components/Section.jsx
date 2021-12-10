import React from 'react'

import Gradient from "./Gradient"
import Background from "./Background";

export default function Section({ backgroundName, site, next, prev, children }) {
    return <section>
        <Background name={backgroundName} site={site}/>
        <Gradient/>
        {children}
        {prev && <a className="prev" href={prev}><i className="fas fa-sort-up"/></a>}
        {next && <a className="next" href={next}><i className="fas fa-sort-down"/></a>}
    </section>
}