import { Link } from "react-router-dom";
import { set } from "idb-keyval";
import { Fragment, useEffect, useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";

const recorder = new MicRecorder({ bitRate: 128 });

export const AudioRecorder = (): JSX.Element => {
  {
    const [recording, setRecording] = useState(false);
    const [blobUrl, setBlobUrl] = useState<string | undefined>(undefined);
    const start = () => {
      recorder
        .start()
        .then(() => {
          setRecording(true);
        })
        .catch((e: any) => {
          console.error(e);
        });
    };
    const stop = () => {
      recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]: any) => {
          // do what ever you want with buffer and blob
          // Example: Create a mp3 file and play
          const file = new File(buffer, "recording.mp3", {
            type: blob.type,
            lastModified: Date.now(),
          });
          set('savedFile', file);
          // const player = new Audio(URL.createObjectURL(file));
          // player.play();
        })
        .catch((e: any) => {
          alert("We could not retrieve your message");
          console.log(e);
        });
    };

    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => start()} disabled={recording}>
            Record
          </button>
          <button onClick={() => stop()} disabled={!recording}>
            Stop
          </button>
          <audio src={blobUrl} controls={true} />
        </header>
      </div>
    );
  }
};
