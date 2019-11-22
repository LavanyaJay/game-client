import soundfile from "../sounds/Hypnotic-Puzzle3.mp3";
import Sound from "react-sound";
import React, { Component } from "react";

export default class Song extends Component {
  render() {
    return (
      <Sound
        url={soundfile}
        playStatus={Sound.status.PLAYING}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    );
  }
}
