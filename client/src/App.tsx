import React from "react";
import "./App.css";
import { AppRouter } from "app/routers/index.tsx";
 import { Providers } from "app/providers";

const App = () => {
   return (
    <Providers>
       <AppRouter />
    </Providers>
  );
};

export default App;
