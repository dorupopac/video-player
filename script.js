const videoPlayer = {
  video: document.querySelector('video'),
  progressRange: document.querySelector('.progress-range'),
  progressBar: document.querySelector('.progress-bar'),
  playBtn: document.getElementById('play-btn'),
  volumeIcon: document.getElementById('volume-icon'),
  volumeRange: document.querySelector('.volume-range'),
  volumeBar: document.querySelector('.volume-bar'),
  currentTime: document.querySelector('.time-elapsed'),
  duration: document.querySelector('.time-duration'),
  fullscreenBtn: document.querySelector('.fullscreen'),
  speed: document.querySelector('.player-speed'),
  player: document.querySelector('.player'),
};

// Play & Pause ----------------------------------- //
const showPlayIcon = () => {
  videoPlayer.playBtn.classList.replace('fa-pause', 'fa-play');
  videoPlayer.playBtn.setAttribute('title', 'Play');
};

const togglePlay = () => {
  if (videoPlayer.video.paused) {
    videoPlayer.video.play();
    videoPlayer.playBtn.classList.replace('fa-play', 'fa-pause');
    videoPlayer.playBtn.setAttribute('title', 'Pause');
  } else {
    videoPlayer.video.pause();
    showPlayIcon();
  }
};

// On Video End, show play button icon
videoPlayer.video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate display time format
const displayTime = time => {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
};

// Update progress bar as video plays
const updateProgress = () => {
  videoPlayer.progressBar.style.width = `${
    (videoPlayer.video.currentTime / videoPlayer.video.duration) * 100
  }%`;
  videoPlayer.currentTime.textContent = `${displayTime(
    videoPlayer.video.currentTime
  )} /`;
  videoPlayer.duration.textContent = displayTime(videoPlayer.video.duration);
};

// Click to skip within the video
const setProgress = e => {
  const newTime = e.offsetX / videoPlayer.progressRange.offsetWidth;
  videoPlayer.progressBar.style.width = `${newTime * 100}%`;
  videoPlayer.video.currentTime = newTime * videoPlayer.video.duration;
};

// Volume Controls --------------------------- //

// Default volume
videoPlayer.video.volume = 0.5;

let volumeIconState = videoPlayer.volumeIcon.classList[1];
// Volume bar
const changeVolume = e => {
  videoPlayer.video.muted = false;
  let volume = e.offsetX / videoPlayer.volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) volume = 0;
  if (volume > 0.9) volume = 1;
  videoPlayer.volumeBar.style.width = `${volume * 100}%`;
  videoPlayer.video.volume = volume;
  // Change icon depending on volume
  if (volume > 0.7)
    videoPlayer.volumeIcon.classList.replace(volumeIconState, 'fa-volume-up');
  else if (volume < 0.7 && volume > 0)
    videoPlayer.volumeIcon.classList.replace(volumeIconState, 'fa-volume-down');
  else if (volume === 0)
    videoPlayer.volumeIcon.classList.replace(volumeIconState, 'fa-volume-off');

  volumeIconState = videoPlayer.volumeIcon.classList[1];
};

// Mute Video
const muteVideoSound = () => {
  if (videoPlayer.video.muted) {
    videoPlayer.video.muted = false;
    videoPlayer.volumeIcon.classList.replace('fa-volume-mute', volumeIconState);
    videoPlayer.volumeIcon.setAttribute('title', 'Mute');
    videoPlayer.volumeBar.style.width = `${videoPlayer.video.volume * 100}%`;
  } else {
    videoPlayer.video.muted = true;
    videoPlayer.volumeIcon.classList.replace(volumeIconState, 'fa-volume-mute');
    videoPlayer.volumeIcon.setAttribute('title', 'Unmute');
    videoPlayer.volumeBar.style.width = 0;
  }
};

// Change Playback Speed -------------------- //
const changePlaybackRate = () => {
  videoPlayer.video.playbackRate = videoPlayer.speed.value;
};

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  videoPlayer.video.classList.add('video-fullscreen');
}
/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  videoPlayer.video.classList.remove('video-fullscreen');
}

let fullscreen = false;
// Toggle Fullscreen
const toggleFullscreen = () => {
  !fullscreen ? openFullscreen(videoPlayer.player) : closeFullscreen();
  fullscreen = !fullscreen;
};

// Event Listeners
videoPlayer.playBtn.addEventListener('click', togglePlay);
videoPlayer.video.addEventListener('click', togglePlay);
videoPlayer.video.addEventListener('timeupdate', updateProgress);
videoPlayer.video.addEventListener('canplay', updateProgress);
videoPlayer.progressRange.addEventListener('click', setProgress);
videoPlayer.volumeRange.addEventListener('click', changeVolume);
videoPlayer.volumeIcon.addEventListener('click', muteVideoSound);
videoPlayer.speed.addEventListener('change', changePlaybackRate);
videoPlayer.fullscreenBtn.addEventListener('click', toggleFullscreen);
