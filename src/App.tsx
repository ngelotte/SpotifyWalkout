import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import "./App.css";
import { accessTokenKey } from "./Auth";

function App() {
  const [token, setToken] = useState("");
  let tempToken = localStorage.getItem(accessTokenKey);
  if (tempToken && !token) {
    setToken(tempToken);
  }
  return <>{token === "" ? <Login /> : <WebPlayback token={token} />}</>;
}

export default App;
