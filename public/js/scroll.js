{
  const coolDown = 1000
  const body = document.querySelector("body")
  let time = Date.now()

  body.onwheel = (event) => {
    const section = document.querySelector("section")

    if (!section) return

    if (Date.now() > time + coolDown) time = Date.now()
    else return

    const height = section.clientHeight
    const currentScroll = body.scrollTop - (body.scrollTop % height)

    if ((event.wheelDeltaY ?? event.deltaY) < 0) {
      // next
      console.log("scroll next")
      body.scroll(
        0,
        Math.min(currentScroll + height, body.scrollHeight - height)
      )
    } else {
      // prev
      console.log("scroll prev")
      body.scroll(0, Math.max(currentScroll - height, 0))
    }
  }
}
