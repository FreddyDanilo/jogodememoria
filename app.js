const game = () => {
    const boxs = document.querySelectorAll("div.container div.box")
    const score = document.querySelector("div.score")
    const container = document.querySelector("div.container")
    const btnRestart = document.querySelector("button.restart")
    let images = ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png",
        "0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"]
    let caseOne = 0, caseTwo = 0
    let right = 0, mistake = 0

    boxs.forEach(box => {
        let index = Math.floor(Math.random() * images.length)

        box.innerHTML = `<img src="assets/${images[index]}" data="${images[index]}">`

        images = images.filter((image, i) => { if (index != i) return image })
    })

    const elementsImage = document.querySelectorAll("div.container div.box img")

    boxs.forEach((box, index) => {
        box.onclick = () => {
            if (caseOne === 0) {
                elementsImage.forEach((image, i) => {
                    if (index === i) {
                        image.classList.add("selected")
                        caseOne = image.getAttribute("data")
                    }
                })
            } else if (caseOne !== 0 && caseTwo === 0) {
                elementsImage.forEach((image, i) => {
                    if (index === i) {
                        image.classList.add("selected")
                        caseTwo = image.getAttribute("data")
                    }
                })
            }

            if (caseOne !== 0) {
                if (caseOne === caseTwo) {
                    elementsImage.forEach((img) => {
                        if (img.getAttribute("data") === caseOne || img.getAttribute("data") === caseTwo) img.classList.add("cert")
                        img.classList.remove("selected")
                    })

                    right++
                    score.innerHTML = `
                        <span class="right">${right}</span>
                        <span class="mistake">${mistake}</span>
                    `
                    caseOne = 0, caseTwo = 0

                    if (right === 8) {
                        setTimeout(() => {
                            container.parentNode.removeChild(container)
                            btnRestart.removeAttribute("hidden")
                        }, 1000)
                    }

                } else if (caseTwo !== 0 && caseTwo !== caseOne) {

                    mistake++
                    score.innerHTML = `
                        <span class="right">${right}</span>
                        <span class="mistake">${mistake}</span>
                    `
                    caseOne = 0, caseTwo = 0

                    setTimeout(() => { elementsImage.forEach(image => { image.classList.remove("selected") }) }, 500)
                }
            }
        }
    })

    btnRestart.onclick = () => {
        location.reload()
    }
}

window.onload = game()