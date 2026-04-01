let selectedPhotos = []
let selectedEmoji = ""

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode")
}

function createPhotoCard(url) {
    const card = document.createElement("div")
    card.className = "photo-card"

    card.innerHTML = `
    <input type="checkbox" onclick="selectPhoto('${url}', this)">
    <img src="${url}" />
  `

    return card
}

function getRandomImage() {
    return `https://picsum.photos/200?random=${Math.random()}`
}

function loadInitialPhotos() {
    const grid = document.getElementById("photoGrid")
    grid.innerHTML = ""

    for (let i = 0; i < 5; i++) {
        const url = getRandomImage()
        grid.appendChild(createPhotoCard(url))
    }
}

function loadPhotos() {
    const grid = document.getElementById("photoGrid")
    const url = getRandomImage()
    grid.appendChild(createPhotoCard(url))
}

function refreshPhotos() {
    loadInitialPhotos()
    selectedPhotos = []
}

function selectPhoto(url, checkbox) {
    if (checkbox.checked) {
        selectedPhotos.push(url)
    } else {
        selectedPhotos = selectedPhotos.filter(p => p !== url)
    }
}

function selectEmoji(emoji) {
    selectedEmoji = emoji
}

function applyChanges() {
    const text = document.getElementById("textInput").value
    const font = document.getElementById("fontFamily").value
    const size = document.getElementById("fontSize").value
    const bg = document.getElementById("bgColor").value

    let previewHTML = ""

    if (selectedPhotos.length === 0) {
        previewHTML = `<p class="text-danger">No photo selected</p>`
    } else {
        selectedPhotos.forEach(photo => {
            previewHTML += `
        <div style="margin-bottom:15px; text-align:center; background:${bg}; padding:10px;">
          <img src="${photo}" style="width:100%; border-radius:5px;">
          <p style="font-family:${font}; font-size:${size}px; margin-top:10px;">
            ${text} ${selectedEmoji}
          </p>
        </div>
      `
        })
    }

    document.getElementById("previewContent").innerHTML = previewHTML

    const modal = new bootstrap.Modal(document.getElementById("previewModal"))
    modal.show()
}

function resetEditor() {
    document.getElementById("textInput").value = ""
    document.getElementById("fontSize").value = 16
    selectedEmoji = ""
}

window.onload = loadInitialPhotos