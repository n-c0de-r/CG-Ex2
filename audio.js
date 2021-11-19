getTrack("Ambient Streams");
var trackname = document.getElementById("track");
const audioElement = document.querySelector('#audio');
audioElement.volume = 0.3;
// Mac Os ??? 
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const track = audioCtx.createMediaElementSource(audioElement);
const analyser = audioCtx.createAnalyser();
track.connect(analyser).connect(audioCtx.destination);
//trackname.onchange = ev => getTrack(trackname.value);
audioElement.addEventListener('play', (ev)=> audioCtx.resume());

function getData(analyser, size, type) {
    analyser.fftSize = size;
    var bufferLength = analyser.fftSize;
    var dataArray = new Float32Array(bufferLength);
    if (type == "wave") analyser.getFloatTimeDomainData(dataArray);
    else analyser.getFloatFrequencyData(dataArray);
    return dataArray;
}
var sptrack={};
async function getTrack(name) {
    if (!name) name = trackname.value;
    if (name.length > 0) {
        let URL = "https://raw.githubusercontent.com/n-c0de-r/CG2-Audio-Visualizer/main/Ex2-Track.txt";
        let resp = await fetch(URL, {});
        var newtrack = await resp.json();
        if (!newtrack.error) {
            sptrack = newtrack;
            updateGUI();
        }
        else {
            bear.value = "EXPIRED TOKEN... get NEW ONE";
        }
    }
}

function updateGUI() {
    var pic = document.getElementById("spimg");
    pic.src = sptrack.tracks.items[0].album.images[1].url;
    var audio = document.getElementById("audio");
    audio.src = sptrack.tracks.items[0].preview_url;
    var name = document.getElementById("artistname");
    name.innerText = sptrack.tracks.items[0].artists[0].name;
    if(!sptrack.tracks.items[0].preview_url){
        name.innerHTML += " <h2 style='background-color:red;'>Preview not available</h2>"        
    }
    name = document.getElementById("trackname");
    name.innerText = sptrack.tracks.items[0].name;
}