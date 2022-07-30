import { AudioPlayerProvider, useAudioPlayer } from "react-use-audio-player";
import { get } from "idb-keyval";
import {useEffect, useState} from 'react'

export const AudioPlayer = (): JSX.Element => {
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    let active = true
    load()
    return () => { active = false }
  
    async function load() {
      const file = await get("savedFile");
      if(file)
      {
        let url = URL.createObjectURL(file)
        setUrl(url)
      }
      
      if (!active) { return }
      
    }
  },[]);


if(url)
{
  return (

  
  <AudioPlayerProvider>

  <MiniAudioPlayer url={url}/>
  </AudioPlayerProvider> 
  )
}
return <div>Loading Audio</div>
};

export interface MiniAudioProps {
  url: string
}

export const MiniAudioPlayer = ({
  url
}: MiniAudioProps) => {

  const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
    src: url,
    format: "mp3",
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
