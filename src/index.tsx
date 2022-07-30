import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import { AudioRecorder } from "./Recorder";
import PrimaryAudioPlayer from "./AudioPlayer";
import { AuthLogin, Callback } from "./Auth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="Recording" element={<AudioRecorder />} />
      <Route path="TestRecording" element={<PrimaryAudioPlayer />} />
      <Route path="auth/login/" element={<AuthLogin />} />
      <Route path="auth/callback" element={<Callback />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
