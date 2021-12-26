{
  const body = document.querySelector("body")
  let autoScrolls = document.getElementsByClassName("auto-scroll")
  let mouseY = 0

  const shift = 200
  const speed = 10

  if (autoScrolls.length > 0) {
    body.onmousemove = (event) => (mouseY = event.clientY)

    setInterval(() => {
      autoScrolls = document.getElementsByClassName("auto-scroll")

      let moveY = 0

      if (mouseY > window.innerHeight - shift) moveY = -speed
      else if (mouseY < shift) moveY = speed
      else return

      for (const autoScroll of autoScrolls)
        autoScroll.scroll(0, autoScroll.scrollY + moveY)
    }, 100)
  }
}
