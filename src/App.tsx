import React from "react";
import "./App.css";
import Frame from "./components/Frame";
import Time from "./components/Time";
import Search from "./components/Search";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="container mx-auto grid justify-items-center box-border h-50 w-100 bg-">
      <Search />
      <Time />
      <Frame />
      

      <Footer />
    </div>
  );
}

export default App;
