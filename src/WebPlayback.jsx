import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { Link } from "react-router-dom";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [deviceId, setDeviceId] = useState(null);
  const [deviceTransferAttempted, setDeviceTransferAttempted] = useState(false);
  const [spotify, setSpotify] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Walkout App",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
      player.getCurrentState().then((state) => {
        !state ? setActive(false) : setActive(true);
      });
      const spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(
        props.token
      );
      setSpotify(spotifyApi);
    };
  }, []);

  if (spotify && deviceId && deviceTransferAttempted == false) {
    setDeviceTransferAttempted(true);
    spotify.transferMyPlayback([deviceId]).then(
      function () {
        console.log("Transfering playback to " + deviceId);
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log("Something went wrong!", err);
      }
    );
  }

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              {" "}
              Instance not active. Transfer your playback using your Spotify app{" "}
            </b>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <img
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">
                {current_track.artists[0].name}
              </div>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.previousTrack();
                }}
              >
                &lt;&lt;
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? "PLAY" : "PAUSE"}
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.nextTrack();
                }}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              player.seek(74 * 1000);
              if (is_paused) {
                player.togglePlay();
              }
            }}
          >
            Move
          </button>
          <button
            onClick={() => {
              player.seek(74 * 1000);
              if (is_paused) {
                player.togglePlay();
              }
            }}
          >
            Move
          </button>
          <Link to="Recording">Record Name</Link>
        </div>
      </>
    );
  }
}

export default WebPlayback;
