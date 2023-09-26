class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hiHatAudio = document.querySelector(".hihat-sound");
    this.playButton = document.querySelector(".play");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  repeat() {
    const step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.play();
          this.kickAudio.currentTime = 0;
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hiHatAudio.play();
          this.hiHatAudio.currentTime = 0;
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateBtn() {
    if (this.isPlaying) {
      this.playButton.innerText = "Play";
      this.playButton.classList.remove("active");
    } else {
      this.playButton.innerText = "Stop";
      this.playButton.classList.add("active");
    }
  }
  changeSound(event) {
    const selectionName = event.target.name;
    const selectionValue = event.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hiHatAudio.src = selectionValue;
        break;
    }
  }
  mute(event) {
    const muteIndex = event.target.getAttribute("data-track");
    event.target.classList.toggle("active");
    if (event.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hiHatAudio.volume = 0;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hiHatAudio.volume = 1;
      }
    }
  }
  changeTempo(event) {
    const tempoText = document.querySelector(".tempo-number");
    tempoText.innerText = event.target.value;
  }
  updateTempo(event) {
    this.bpm = event.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playButton.classList.contains("active")) {
      this.start();
    }
  }
}
const beat = new DrumKit();
beat.playButton.addEventListener("click", () => {
  beat.updateBtn();
  beat.start();
});

beat.pads.forEach(function (pad) {
  pad.addEventListener("click", function activePad() {
    this.classList.toggle("active");
  });
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

beat.selects.forEach((select) => {
  select.addEventListener("change", function (event) {
    beat.changeSound(event);
  });
});

beat.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    beat.mute(event);
  });
});

beat.tempoSlider.addEventListener("input", function (event) {
  beat.changeTempo(event);
});
beat.tempoSlider.addEventListener("change", function (event) {
  beat.updateTempo(event);
});
