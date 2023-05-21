let playerArea = document.querySelector('.myplayer');
let media = playerArea.querySelector('video');
let controls = playerArea.querySelector('.myplayer__controls');

let play = controls.querySelector('.play');
let rewind = controls.querySelector('.rewind');
let forward = controls.querySelector('.forward');
let fullScreen = controls.querySelector('.fullscreen');

let timeArea = document.querySelector('.timer')
let currentTime = timeArea.querySelector('.currentTime');
let videoTime = timeArea.querySelector('.videoTime');

let timerBar = controls.querySelector('.controls__progressbar-current');
let volumeIcon = controls.querySelector('.volume .icon');
let volumeProgress = controls.querySelector('div.volume__progress');
let volumeValue = volumeProgress.querySelector('input');
let fullScreenBtn = controls.querySelector('.fullscreen');

play.addEventListener('click', function() {
    videoTime.textContent = getTime(media.duration)
    if(media.paused) {
        togglePlayIcon()
        media.play();
    } else {
        togglePlayIcon()
        media.pause();
    }
})

function togglePlayIcon() {
    let icon = play.querySelector('i');
    icon.classList.toggle('ion-md-pause');
    icon.classList.toggle('ion-md-play');
}

rewind.addEventListener('click', function() {
    media.currentTime -= 5;
})

forward.addEventListener('click', function() {
    media.currentTime += 5;
})

media.addEventListener('click', () => {
    if(media.paused) {
        togglePlayIcon();
        media.play();
    } else {
        togglePlayIcon();
        media.pause();
    }
})

media.addEventListener('timeupdate', () => {
    let barLength = (media.currentTime / media.duration) * 100;
    timerBar.style = `background: linear-gradient(90deg, rgba(230,126,34,1) ${barLength}%, #e1e1e1 0%)`;
    timerBar.value = barLength;
    if(media.ended) {
        togglePlayIcon();
    }
    currentTime.textContent = getTime(media.currentTime);
})

timerBar.addEventListener('input', function() {
    media.currentTime = (this.value / 100) * media.duration;
})

function getTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
        minuteValue = '0' + minutes;
    }   else {
        minuteValue = minutes
    }
    if(seconds < 10) {
        secondValue = '0' + seconds;
    } else {
        secondValue = seconds;
    }
    return minuteValue + ':' + secondValue;
}

volumeIcon.addEventListener('click', function() {
    volumeProgress.classList.toggle('active');
})

volumeValue.addEventListener('input', function() {
    console.log(this.value, media.volume)
    media.volume = this.value / 100;
    this.style = `background: linear-gradient(90deg, rgba(230,126,34,1) ${this.value}%, #e1e1e1 50%)`
})

fullScreenBtn.addEventListener('click', function() {
    if(!document.fullscreenElement) {
        if(playerArea.requestFullscreen) {
            playerArea.requestFullscreen();
        } else if(playerArea.mozFullScreenElement) {
            playerArea.mozFullScreenElement();
        } else if(playerArea.msFullScreenElement) {
            playerArea.msFullScreenElement();
        } else if(playerArea.webkitFullScreenElement) {
            playerArea.webkitFullScreenElement();
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.msCancelFullScreen) {
            document.msCancelFullScreen();
        } else if(document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
})
