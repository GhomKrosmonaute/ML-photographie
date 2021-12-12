import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Image({ image, remove, admin, view }) {
  const [isPublic, setIsPublic] = React.useState(image.public)

  function unpublish() {
    setIsPublic(false)
  }

  function publish() {
    if (confirm("Voulez-vous vraiment publier la photo ?")) setIsPublic(true)
  }

  return (
    <div
      className={"image " + (isPublic ? "public " : "") + (view ? "view " : "")}
    >
      <img
        src={"/public/images/photos/" + image.id + ".jpg"}
        alt={"photo " + image.id}
      />
      <div
        className="buttons"
        style={
          view
            ? {
                flexDirection: "column",
                justifyContent: "center",
                background: "none",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
              }
            : {}
        }
      >
        {admin && (
          <>
            <a href={"/photo/edit/" + image.id} title="Modifier">
              <FontAwesomeIcon icon={["fas", "edit"]} />
            </a>
            {remove ? (
              <span
                className="clickable-icon"
                title="Supprimer"
                onClick={() => remove(image.id)}
              >
                <FontAwesomeIcon icon={["fas", "trash-alt"]} />
              </span>
            ) : (
              <a href={"/photo/remove/" + image.id} title="Supprimer">
                <FontAwesomeIcon icon={["fas", "trash-alt"]} />
              </a>
            )}
            <span className="clickable-icon">
              {isPublic ? (
                <span title="Rendre privée" onClick={unpublish}>
                  <FontAwesomeIcon icon={["fas", "ban"]} />
                </span>
              ) : (
                <span title="Publier" onClick={publish}>
                  <FontAwesomeIcon icon={["fas", "paper-plane"]} />
                </span>
              )}
            </span>
          </>
        )}
        {!view && (
          <a href={"/photo/view/" + image.id} title="Afficher">
            <FontAwesomeIcon icon="search-plus" />
          </a>
        )}
        <a href={"/photo/order/" + image.id} title="Commander">
          <FontAwesomeIcon icon="plus" />
        </a>
      </div>
    </div>
  )
}
