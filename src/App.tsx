import { BrowserRouter, Navigate, Route, Routes } from "react-router";
// import TestPage from "./pages/TestPage/TestPage";
import enMessages from "@/locales/en.json";
import esMessages from "@/locales/es.json";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IntlProvider } from "react-intl";
import PretestHomePage from "./pages/pretest/HomePage/HomePage";
import PretestLoginPage from "./pages/pretest/LoginPage/LoginPage";
import Pretest2HomePage from "./pages/pretest2/HomePage/HomePage";
import Pretest2ProfilePage from "./pages/pretest2/ProfilePage/ProfilePage";
import TestDetailPage from "./pages/test/DetailPage/DetailPage";
import TestLoginPage from "./pages/test/LoginPage/LoginPage";
import TestHomePage from "./pages/test/MainPage/HomePage";

const queryClient = new QueryClient();
function App() {
  return (
    <IntlProvider locale="es" defaultLocale="en" messages={esMessages}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/test"} />} />
            <Route path="/test">
              <Route index element={<Navigate to={"./login"} />} />
              <Route path="login" element={<TestLoginPage />} />
              <Route path="home" element={<TestHomePage />} />
              <Route path="menu" element={<TestDetailPage type={"menu"} />} />
              <Route
                path="stores"
                element={<TestDetailPage type={"stores"} />}
              />
              <Route path="cart" element={<TestDetailPage type={"cart"} />} />
            </Route>
            <Route path="/pretest">
              <Route index element={<Navigate to={"./login"} />}></Route>
              <Route path="login" element={<PretestLoginPage />} />
              <Route path="home" element={<PretestHomePage />} />
            </Route>
            <Route path="/pretest2">
              <Route index element={<Navigate to={"./home"} />}></Route>
              <Route path="home" element={<Pretest2HomePage />} />
              <Route path="profile" element={<Pretest2ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </IntlProvider>
  );
}

export default App;
