{
  const coolDown = 1000
  let body = document.querySelector("body")
  let time = Date.now()

  body.onwheel = (event) => {
    const section = document.querySelector("section")

    if (!section) return

    if (Date.now() > time + coolDown) time = Date.now()
    else return

    body = document.querySelector("body")

    const height = section.clientHeight
    const currentScroll = window.scrollY - (window.scrollY % height)

    if ((event.wheelDeltaY ?? event.deltaY) < 0) {
      // next
      window.scroll(0, Math.min(currentScroll + height, body.scrollHeight))
    } else {
      // prev
      window.scroll(0, Math.max(currentScroll - height, 0))
    }
  }
}
