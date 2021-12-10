import React from 'react'

export default function Nav({ children }) {
    return <nav>
        <ul>
            {children.map((child, i) => <li key={i}>{child}</li>)}
        </ul>
    </nav>
}