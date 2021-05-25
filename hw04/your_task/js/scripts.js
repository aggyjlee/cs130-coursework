const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const playTrack = (ev) => {
    //console.log(ev.currentTarget);
    const elem = ev.currentTarget;
    // preview url (the mp3) has been stashed in the "data-preview-track" attribute.
    // we need to get that attribute out!
    //const previewURL = elem.dataset.previewTrack;
    const previewURL = elem.getAttribute('data-preview-track');
    console.log(previewURL);
    if(previewURL) {
        audioPlayer.setAudioFile(previewURL);
        audioPlayer.play();
    } else {
        console.log('there is no preview available for this track.');
    }
    document.querySelector('footer .track-item').innerHTML = elem.innerHTML;
};

const getTracks = (term) => {
    let url = baseURL + "?type=track&q=" + term + "&limit=5";
    fetch(url)
        .then(response=> response.json())
        .then(data => {
                // what type of dat?
                // it's a list of objects where each object represents a track of data
                // display (as some sort of the HTML block) each of the tracks in the container.
                // first slice the list [might not be necessary here]
                // then loop through the results using for ... of
                //console.log(data);
            document.querySelector('#tracks').innerHTML = '';
            for (const track of data) {
                //create an HTML element for each track;
                let template = '';
                if (!track.preview_url){
                    template = `
                    <section class="track-item preview" data-preview-track="${track.preview_url}">
                        <img src="${track.album.image_url}">
                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                            <div class="label">
                                <h3>${track.name} - No preview available </h3>
                                <p>
                                    ${track.artist.name}
                                </p>
                            </div>
                    </section>`;
                } else {
                    template = `
                    <section class="track-item preview" data-preview-track="${track.preview_url}">
                        <img src="${track.album.image_url}">
                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                            <div class="label">
                                <h3>${track.name}</h3>
                                <p>
                                    ${track.artist.name}
                                </p>
                            </div>
                    </section>`; 
                }
                document.querySelector('#tracks').innerHTML += template;
            }
            for (const elem of document.querySelectorAll('.track-item.preview')){
                elem.onclick = playTrack;
            }
            if (data.length == 0){
                const error = `<p>No tracks found that match your search criteria.</p>`;
                document.querySelector('#tracks').innerHTML += error;
            }
        })
};

const getAlbums = (term) => {
    let url = baseURL + "?type=album&q=" + term;
    fetch(url)
        .then(response=> response.json())
        .then((data) => {
            document.querySelector('#albums').innerHTML = '';
            for (const album of data) {
                const template = `<section class="album-card" id="${album.id}">
                <div>
                    <img src="${album.image_url}">
                    <h3>${album.name}</h3>
                    <div class="footer">
                        <a href="${album.spotify_url}" target="_blank">
                            view on spotify
                        </a>
                    </div>
                </div>
            </section>`;
                document.querySelector('#albums').innerHTML += template;
            }
            if (data.length == 0){
                const error = `<p>No albums were returned.</p>`;
                document.querySelector('#albums').innerHTML += error;
            }
    })
};


const getArtist = (term) => {
    const elem = document.querySelector('#artist');
    elem.innerHTML = "";
    fetch(baseURL + '?type=artist&q=' + term) /*no semi colon because fetch attaches */
    .then(response => response.json())
    .then((data) => {
        if (data.length > 0){
            const firstArtist = data[0];
            elem.innerHTML += getArtistHTML(firstArtist);
        }
    });
};

const getArtistHTML = (data) => {
    if (!data.image_url) {
        data.image_url = 'https://www.pngkit.com/png/full/943-9439413_blue-butterfly-free-png-image-dark-blue-to.png';   
    }
    return `<section class="artist-card" id="${data.id}">
            <div>
                <img src="${data.image_url}">
                <h3>${data.name}</h3>
                <div class="footer">
                    <a href="${data.spotify_url}" target="_blank">
                        view on spotify
                    </a>
                </div>
            </div>
        </section>`;
}; 


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};