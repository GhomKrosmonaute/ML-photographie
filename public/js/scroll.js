{
  const coolDown = 1000
  let time = Date.now()

  document.body.onwheel = function (event) {
    event.preventDefault()

    const section = document.querySelector("section")

    if (!section) return

    if (Date.now() > time + coolDown) time = Date.now()
    else return

    const height = section.clientHeight
    const currentScroll =
      document.body.scrollTop - (document.body.scrollTop % height)

    if (event.wheelDeltaY < 0) {
      // next
      document.body.scroll(0, Math.min(currentScroll + height, document.body.scrollHeight - height))
    } else {
      // prev
      document.body.scroll(0, Math.max(currentScroll - height, 0))
    }
  }
}
