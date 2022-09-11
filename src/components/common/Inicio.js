import React, { useState, useMemo } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Main from "./Main";

import FavContext from "../context/FavContext";

const Inicio = () => {
  const [favoritas, setFavoritas] = useState({});
  const value = useMemo(() => ({ favoritas, setFavoritas }), [favoritas]);

  return (
    <FavContext.Provider value={value}>
      <Navigation></Navigation>
      <Main></Main>
      <Footer></Footer>
    </FavContext.Provider>
  );
};

export default Inicio;
