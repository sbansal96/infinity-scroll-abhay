

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = []
const count = 30;
const apiKey = "PqeaVFmwuCmMtZ6psljzLR12_1offmr-9s-MVbIoA9c";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoadedCount = 0;
let totalImages = 0;



// Helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imagesLoaded() {
    imagesLoadedCount++;
    if (imagesLoadedCount === totalImages) {
        ready = true;
        loader.hidden = true
    }
}

function displayPhotos() {

    imagesLoadedCount = 0;
    totalImages = photosArray.length

    photosArray.forEach((photo) => {
        // Create <a> to link to full photo
        const anchor_a = document.createElement('a');
        setAttributes(anchor_a, {
            href: photo.links.html,
            target: "_blank"
        })
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        img.addEventListener('load', imagesLoaded);
        anchor_a.appendChild(img);
        imageContainer.appendChild(anchor_a);

    })
}

//get photos from api 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();

        displayPhotos()
    }
    catch (error) {
        console.log(error)
    }

}


// infinity scroll
window.addEventListener('scroll', () => {

    console.log("window.innerHeight", window.innerHeight);
    console.log("window.scrollY", window.scrollY);
    console.log(" document.body.offsetHeight", document.body.offsetHeight);

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


getPhotos()