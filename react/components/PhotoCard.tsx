import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function PhotoCard({
  photo,
  admin,
  remove,
}: Pick<Options, "photo" | "admin"> & {
  remove: (photoId: Photography["id"]) => unknown
  view?: boolean
}) {
  const [isPublic, setIsPublic] = React.useState(photo.public)
  const [highlighted, setHighlighted] = React.useState(photo.highlighted)

  function publish() {
    if (confirm("Voulez-vous vraiment publier la photo ?")) setIsPublic(true)
  }

  function unpublish() {
    setIsPublic(false)
  }

  function highlight() {
    setHighlighted(true)
  }

  function unHighlight() {
    setHighlighted(false)
  }

  return (
    <div className={"image " + (isPublic ? "public " : "")}>
      <img
        src={"/public/images/photos/" + photo.id + ".jpg"}
        alt={"photo " + photo.id}
      />
      <div className="buttons">
        {admin && (
          <>
            {highlighted ? (
              <span
                className="clickable-icon"
                title="Retirer de la page d'accueil"
                onClick={unHighlight}
              >
                <FontAwesomeIcon icon={["fas", "star-exclamation"]} />
              </span>
            ) : (
              <span
                className="clickable-icon"
                title="Mettre en avant"
                onClick={highlight}
              >
                <FontAwesomeIcon icon={["fas", "star"]} />
              </span>
            )}
            <a href={"/photo/edit/" + photo.id} title="Modifier">
              <FontAwesomeIcon icon={["fas", "edit"]} />
            </a>
            {remove ? (
              <span
                className="clickable-icon"
                title="Supprimer"
                onClick={() => remove(photo.id)}
              >
                <FontAwesomeIcon icon={["fas", "trash-alt"]} />
              </span>
            ) : (
              <a href={"/photo/remove/" + photo.id} title="Supprimer">
                <FontAwesomeIcon icon={["fas", "trash-alt"]} />
              </a>
            )}
            {isPublic ? (
              <span
                title="Rendre privée"
                className="clickable-icon"
                onClick={unpublish}
              >
                <FontAwesomeIcon icon={["fas", "ban"]} />
              </span>
            ) : (
              <span
                title="Publier"
                className="clickable-icon"
                onClick={publish}
              >
                <FontAwesomeIcon icon={["fas", "paper-plane"]} />
              </span>
            )}
          </>
        )}
        <a href={"/photo/view/" + photo.id} title="Afficher">
          <FontAwesomeIcon icon="search-plus" />
        </a>
        <a href={"/photo/order/" + photo.id} title="Commander">
          <FontAwesomeIcon icon="plus" />
        </a>
      </div>
    </div>
  )
}
