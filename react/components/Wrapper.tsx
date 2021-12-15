import React from "react"

import PhotoCard from "./PhotoCard"

export default function Wrapper({
  photos,
  admin,
}: Pick<Options, "photos" | "admin">) {
  const [cachedImages, setCachedImages] = React.useState(photos)

  function removeImage(id: number) {
    if (confirm("Supprimer l'image ?"))
      setCachedImages(cachedImages.filter((i) => i.id !== id))
  }

  const displayImages: (Photography | null)[] = cachedImages.slice(0, 5)

  while (displayImages.length < 10) {
    displayImages.push(null)
  }

  return (
    <div
      className="image-wrapper"
      style={{
        overflowY: "scroll",
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 2%)",
        boxShadow: "inset 0 0 15px rgba(0, 0, 0, 20%)",
        transform: "translate(-50%, -50%)",
        height: "85vh",
        width: "90vw",
        left: "50vw",
        top: "50vh",
        zIndex: 3,
      }}
    >
      {displayImages.map((photo, i) =>
        photo ? (
          <PhotoCard admin={admin} key={i} photo={photo} remove={removeImage} />
        ) : (
          <div key={i} />
        )
      )}
    </div>
  )
}
