import { Navigate, useParams, useSearchParams } from "react-router-dom";

const spotifyRedirectUri = "http://localhost:3000/auth/callback";
const spotifyClientId = "b07253ea2c0644139ea3dae70a8b4ba1";
const stateKey = "spotifyStateKey";
export const accessTokenKey = "spotifyAccessToken";
var generateRandomString = function (length: number) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const AuthLogin = () => {
  {
    var scope =
      "streaming user-modify-playback-state user-read-email user-read-private user-read-currently-playing user-read-playback-position user-read-playback-state user-library-read";
    var state = generateRandomString(16);
    localStorage.setItem(stateKey, state);
    var auth_query_parameters = new URLSearchParams({
      response_type: "token",
      client_id: spotifyClientId,
      scope: scope,
      redirect_uri: spotifyRedirectUri,
      state: state,
    });
    let url =
      "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString();
    window.location.replace(url);

    return null;
  }
};

export const Callback = () => {
  {
    
    let accessToken = window.location.href.split('#')[1].split('=')[1].split('&')[0];
    console.log(accessToken);
    
    localStorage.setItem(accessTokenKey, accessToken ?? "");
    return <Navigate to="/" />;
  }
};
