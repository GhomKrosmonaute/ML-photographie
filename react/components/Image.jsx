import React from "react"

export default function Image({ image, remove, admin }) {
  const [isPublic, setIsPublic] = React.useState(image.public)

  function unpublish() {
    setIsPublic(false)
  }

  function publish() {
    if (confirm("Voulez-vous vraiment publier la photo ?")) setIsPublic(true)
  }

  return (
    <div className={"image " + (isPublic ? "public" : "")}>
      <img
        src={"/public/images/photos/" + image.id + ".jpg"}
        alt={"photo " + image.id}
      />
      <div className="buttons">
        {admin && (
          <>
            <a href={"/edit/" + image.id} title="Modifier">
              <i className="fas fa-edit" />
            </a>
            <span className="clickable-icon">
              <i
                className="fas fa-trash-alt"
                title="Supprimer"
                onClick={remove}
              />
            </span>
            <span className="clickable-icon">
              {_public ? (
                <i
                  className="fas fa-ban"
                  title="Rendre privée"
                  onClick={unpublish}
                />
              ) : (
                <i
                  className="fas fa-paper-plane"
                  title="Publier"
                  onClick={publish}
                />
              )}
            </span>
          </>
        )}
        <a href={"/view/" + image.id} title="Afficher">
          <i className="fa fa-search-plus" />
        </a>
        <a href={"/order/" + image.id} title="Commander">
          <i className="fa fa-plus" />
        </a>
      </div>
    </div>
  )
}
