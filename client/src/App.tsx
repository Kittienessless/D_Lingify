import React from "react";
import "./App.css";
import { AppRouter } from "app/routers/index.tsx";
 import { Providers } from "app/providers";
import './i18n.tsx';

const App = () => {
   return (
    <Providers>
       <AppRouter />
    </Providers>
  );
};

export default App;
