import {
  createRoutesFromElements,
  createHashRouter,
  Route,
  RouterProvider,
  useLocation,
  Navigate,
  Routes,
} from "react-router-dom";
import clsx from "clsx";

import { useThemeMode } from "../styles/themes/useThemeMode.ts";
import Layout  from "app/layout/Layout.tsx";
import { ProfilePage } from "pages/userPage";
import { HandbookPage } from "pages/handbookPage";
import { AboutPage } from "pages/aboutPage";
import { CreateLanguagePage } from "pages/createLanguagePage";
import { AuthPage } from "pages/authPage";
import { Fallback } from "shared/ui/fallback/Fallback.tsx";
import StartPage from "pages/startPage/StartPage.tsx";
import { RegisterWidget } from "widgets/registerWidget/index.ts";
import { PwdRecoveryWidget } from "widgets/pwdRecoreryWidget/index.ts";
import { useContext, useEffect, useState } from "react";
import AdminPage from "pages/adminPage/AdminPage.tsx";
import { RedactLanguage } from "widgets/languageWidget/ui/RedactLanguage.tsx";
import { LanguageWidget } from "widgets/languageWidget/ui/LanguageWidget.tsx";
import { RecoverPwd } from "widgets/pwdRecoreryWidget/ui/RecoverPwd.tsx";
import { UserContext } from "app/providers/index.tsx";

export const AppRouter = () => {
  const { theme } = useThemeMode();


  const routers = createRoutesFromElements(
<<<<<<< HEAD
    <Route path="/" element={<Layout />}>
=======
    <Route path="/"  element={<Layout />}>
>>>>>>> 4f58ac43c48caad787c384d733505571a0d1524d
      <Route index element={<StartPage />} />
      <Route path="/About" element={<AboutPage />} />
      <Route path="/Auth" element={<AuthPage />} />
      <Route path="/Auth/register" element={<RegisterWidget />} />
      <Route path="/Auth/recover" element={<PwdRecoveryWidget />} />
      <Route path="/Admin" element={<AdminPage />} />
      <Route path="/Profile" element={<ProfilePage />} />
      <Route path="/Handbook" element={<HandbookPage />} />
      <Route path="/Language" element={<CreateLanguagePage />} />
      <Route path="/redactLanguage">
        <Route path=":id" element={<RedactLanguage />} />
      </Route>
      <Route path="/Auth/recoverNewPassword" element={<RecoverPwd />} />
<<<<<<< HEAD
      <Route path="*" element={<Fallback />} />
=======
            <Route path="*" element={<Fallback />} />

>>>>>>> 4f58ac43c48caad787c384d733505571a0d1524d
    </Route>
  );

  const router = createHashRouter(routers, {});

  return (
    <div className={clsx("app", theme)}>
      <RouterProvider router={router} />
    </div>
  );
};
