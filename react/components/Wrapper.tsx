import React from "react"

import PhotoCard from "./PhotoCard"

export default function Wrapper({
  photos,
  admin,
  autoScroll,
}: Pick<Options, "photos" | "admin"> & { autoScroll?: true }) {
  const [cachedImages, setCachedImages] = React.useState(photos)

  function removeImage(id: number) {
    if (confirm("Supprimer l'image ?"))
      setCachedImages(cachedImages.filter((i) => i.id !== id))
  }

  const displayImages: (Photography | null)[] = cachedImages.slice(0, 5)

  while (displayImages.length < 10) displayImages.push(null)

  return (
    <div
      className={"image-wrapper " + (autoScroll ? "auto-scroll" : "")}
      style={{
        overflowY: autoScroll ? "scroll" : "hidden",
        backgroundColor: "rgba(255, 255, 255, 2%)",
        boxShadow: "inset 0 0 15px rgba(0, 0, 0, 20%)",
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
