import React from "react"

import Image from "./Image"

export default function Wrapper({ images }) {
  const [cachedImages, setCachedImages] = React.useState(images)

  function removeImage(id) {
    if (confirm("Supprimer l'image ?"))
      setCachedImages(cachedImages.filter((i) => i.id !== id))
  }

  const displayImages = cachedImages.slice(0, 5)

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
        zIndex: 3,
        height: "85vh",
        width: "90vw",
        left: "50vw",
        top: "50vh",
        transform: "translate(-50%, -50%)",
      }}
    >
      {displayImages.map((img, i) =>
        img ? (
          <Image key={i} image={img} remove={() => removeImage(img.id)} />
        ) : (
          <div key={i} />
        )
      )}
    </div>
  )
}
