import { useAudioPlayer } from "react-use-audio-player";
import { get } from "idb-keyval";

export const AudioPlayer = (): JSX.Element => {
  const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
    src: get("Player1-Recording"),
    format: "base64",
    autoplay: false,
    onend: () => console.log("sound has ended!"),
  });

  if (!ready && !loading) return <div>No audio to play</div>;
  if (loading) return <div>Loading audio</div>;

  return (
    <div>
      <button onClick={togglePlayPause}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default AudioPlayer;
