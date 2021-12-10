import React from 'react'

import Nav from "../components/Nav"
import Page from "../components/Page"
import Section from "../components/Section"
import Wrapper from "../components/Wrapper"
import Citation from "../components/Citation"

export default function Home({site, admin}) {
    return <Page site={site}>
        <Section id="title" backgroundName="primary" next="/#gallery" site={site}>
            <Nav>
                <a href="/#gallery"> Gallerie </a>
                <a href="/#about"> A propos </a>
                {admin ? <>
                    <a href="/admin"> Administration </a>
                    <a href="/logout">
                        <span className="more-of-850"> Se déconnecter </span>
                        <span className="less-of-850"> <i className="fa fa-sign-out-alt"/> </span>
                    </a>

                </> : <a href="/login"> Se connecter </a>}
            </Nav>

            <h1> {site.name} </h1>
        </Section>

        <Section site={site} id="gallery" backgroundName="secondary" prev="/#title" next="/#about">
            <Wrapper/>
        </Section>

        <Section site={site} id="about" backgroundName="tertiary" prev="/#gallery">
            <Citation> {site.description} </Citation>
        </Section>
    </Page>
}

<body>

    <section id=about>
        <%- include('../components/background', { name: 'tertiary' }) %>

        <p> <%- site.description %> </p>

        <div class="gradient"></div>

        <a class=prev href="/#gallery"><i class="fas fa-sort-up"></i></a>
    </section>

    <script type="text/babel">
        function Image({ image, remove }) {
            const [_public, setPublic] = React.useState(image.public)

            function unpublish() {
                setPublic(false)
            }

            function publish() {
                if(confirm("Voulez-vous vraiment publier la photo ?")) setPublic(true)
            }

            return (
                <div className={"image " + (_public ? "public" : "")}>
                    <img src={"/public/images/photos/" + image.name} alt={"photo " + image.id}/>
                    <div className="buttons">
                        <% if(admin){ %>
                        <a href={"/edit/" + image.id} title="Modifier"><i className="fas fa-edit"/></a>
                        <span className="clickable-icon"><i className="fas fa-trash-alt" title="Supprimer" onClick={remove}/></span>
                        <span className="clickable-icon">{_public
                            ? <i className="fas fa-ban" title="Rendre privée" onClick={unpublish}/>
                            : <i className="fas fa-paper-plane" title="Publier" onClick={publish}/>
                        }</span>
                        <% } %>
                        <a href={"/view/" + image.id} title="Afficher"><i className="fa fa-search-plus"/></a>
                        <a href={"/order/" + image.id} title="Commander"><i className="fa fa-plus"/></a>
                    </div>
                </div>
            )
        }

        function Wrapper() {
            const [_images, _setImages] = React.useState(<%- JSON.stringify(images) %>)

            function removeImage(id){
                if(confirm("Supprimer l'image ?"))
                    _setImages(_images.filter(i => i.id !== id))
            }

            const displayImages = _images.slice(0,5)

            while(displayImages.length < 10) {
                displayImages.push(null)
            }

            return (
                <div className="image-wrapper" style={{
                    overflowY: "scroll",
                    position: "absolute",
                    backgroundColor: "rgba(255, 255, 255, 2%)",
                    boxShadow: "inset 0 0 15px rgba(0, 0, 0, 20%)",
                    zIndex: 3,
                    height: "85vh",
                    width: "90vw",
                    left: "50vw",
                    top: "50vh",
                    transform: "translate(-50%, -50%)"
                }}>
                    {displayImages.map((img, i) => img ? <Image key={i} image={img} remove={() => removeImage(img.id)}/> : <div key={i}/>)}
                </div>
            )
        }

        ReactDOM.render(<Wrapper/>, document.getElementById('wrapper'));
    </script>
</body>



