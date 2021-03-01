import React from "react";
import "./App.css";
import MainLogo from "./assets/vodafone_logo.svg";
import GalleryContainer from "./components/GalleryContainer";

const App = () => {
  return (
    <div className="App">
      <header className="app-header">
          <img className="main-logo" src={MainLogo} alt="Vodafone" />
      </header>
      <GalleryContainer />
      <div id="phone-details" className="modal"></div>
    </div>
  );
}

export default App;
