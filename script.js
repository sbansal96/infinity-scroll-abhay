


const count = 2;
const apiKey = "zj7UwBJ4nJAYLr4FbhqStDe9nB_WGJf6Nd1jJKxMr8E";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


//get photos from api 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        let photosArray = await response.json();
        console.log(photosArray)
    }
    catch (error) {
        console.log(error)
    }

}

getPhotos()