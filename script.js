const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
const showPlayIcon = () => {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
};

const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
};

// On Video End, show play button icon
video.addEventListener('ended', showPlayIcon);

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
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = displayTime(video.duration);
};

// Click to skip within the video
const setProgress = e => {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
};

// Volume Controls --------------------------- //

// Default volume
video.volume = 0.5;

let volumeIconState = volumeIcon.classList[1];
let volumeState = video.volume;
// Volume bar
const changeVolume = e => {
  video.muted = false;
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) volume = 0;
  if (volume > 0.9) volume = 1;
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  // Change icon depending on volume
  if (volume > 0.7)
    volumeIcon.classList.replace(volumeIconState, 'fa-volume-up');
  else if (volume < 0.7 && volume > 0)
    volumeIcon.classList.replace(volumeIconState, 'fa-volume-down');
  else if (volume === 0)
    volumeIcon.classList.replace(volumeIconState, 'fa-volume-off');

  volumeIconState = volumeIcon.classList[1];
  volumeState = volume;
};

// Mute Video
const muteVideoSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeIcon.classList.replace('fa-volume-mute', volumeIconState);
    volumeIcon.setAttribute('title', 'Mute');
    video.volume = volumeState;
    volumeBar.style.width = `${volumeState * 100}%`;
  } else {
    video.muted = true;
    volumeIcon.classList.replace(volumeIconState, 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
    video.volume = 0;
    volumeBar.style.width = 0;
  }
};

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', muteVideoSound);
