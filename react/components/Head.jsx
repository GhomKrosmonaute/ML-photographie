import React from 'react'

import Embed from "./Embed"

import "../../public/css/index.css"
import "font-awesome/css/font-awesome.min.css"

export default function Head({ site }) {
    return <head>
        <title> {site.name} </title>
        <link rel="shortcut icon" href="/public/images/favicon.png" type="image/x-icon"/>
        <Embed site={site}/>
    </head>
}