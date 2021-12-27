import React from "react"

import PhotoCard from "./PhotoCard"

export default function Wrapper({
  photos,
  admin,
  autoScroll,
  customClassNames,
}: Pick<Options, "photos" | "admin"> & {
  autoScroll?: true
  customClassNames?: string
}) {
  const [cachedImages, setCachedImages] = React.useState(photos)

  const rows: Photography[][] = [[cachedImages[0]]]

  for (const image of cachedImages.slice(1)) {
    const lastRow = rows[rows.length - 1]

    if (lastRow.length < (rows.length % 2 === 0 ? 3 : 2)) {
      lastRow.push(image)
      rows[rows.length - 1] = lastRow
    } else rows.push([image])
  }

  function removeImage(id: number) {
    if (confirm("Supprimer l'image ?"))
      setCachedImages(cachedImages.filter((i) => i.id !== id))
  }

  return (
    <div
      className={
        "wrapper " +
        (autoScroll ? "auto-scroll " : "") +
        (customClassNames ?? "")
      }
      style={{
        overflowY: autoScroll ? "scroll" : "hidden",
        backgroundColor: "rgba(255, 255, 255, 2%)",
        boxShadow: "inset 0 0 15px rgba(0, 0, 0, 20%)",
        height: "100%",
      }}
    >
      {rows.map((row, i) => (
        <div key={i} className="wrapper-row">
          {row.map((photo, i) => (
            <PhotoCard
              admin={admin}
              key={"_" + i}
              photo={photo}
              remove={removeImage}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
