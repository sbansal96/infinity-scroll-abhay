

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = []
const count = 2;
const apiKey = "zj7UwBJ4nJAYLr4FbhqStDe9nB_WGJf6Nd1jJKxMr8E";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


// Helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
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

getPhotos()