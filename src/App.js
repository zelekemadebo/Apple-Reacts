import React from "react";
import { Routes, Route } from "react-router-dom";

// Home page
import Navigation from "./Components/Nav/Nav";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";

// Pages

import Mac from "./Pages/Mac/Mac";
import Iphone from "./Pages/Iphone/Iphone";
import Ipad from "./Pages/Ipad/Ipad";
import Watch from "./Pages/Watch/Watch";
import TV from "./Pages/TV/TV";
import Music from "./Pages/Music/Music";
import Support from "./Pages/Support/Support";
import Cart from "./Pages/Cart/Cart";
import SingleAppleProduct from "./Pages/IphoneSinglePage";
import Four04 from "./Pages/Four04/Four04";

// import general css
import "./css/styles.css";
import "./css/bootstrap.css";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mac" element={<Mac />} />
        <Route path="/iphone" element={<Iphone />} />
        <Route path="/ipad" element={<Ipad />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/music" element={<Music />} />
        <Route path="/support" element={<Support />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/iphone/:productID" element={<SingleAppleProduct />} />
        <Route path="*" element={<Four04 />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
