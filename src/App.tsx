import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IntlProvider } from "react-intl";
import PretestHomePage from "./pages/pretest/HomePage/HomePage";
import PretestLoginPage from "./pages/pretest/LoginPage/LoginPage";
import Pretest2HomePage from "./pages/pretest2/HomePage/HomePage";
import Pretest2ProfilePage from "./pages/pretest2/ProfilePage/ProfilePage";
import TestDetailPage from "./pages/test/DetailPage/DetailPage";
import TestLoginPage from "./pages/test/LoginPage/LoginPage";
import TestHomePage from "./pages/test/MainPage/HomePage";
import { useState } from "react";
import LocaleContext, {
  getMessages,
  defaultLocale,
} from "./context/LocaleContext";

const queryClient = new QueryClient();

interface LocaleData {
  locale: string;
  messages: { [key: string]: string };
}

function App() {
  const [localeData, setLocaleData] = useState<LocaleData>({
    locale: defaultLocale,
    messages: getMessages(defaultLocale)!,
  });
  const changeLocale = (newLocale: string) => {
    console.log(`Trying to set new locale: ${newLocale}`);
    setLocaleData((prev) => {
      const newMessages = getMessages(newLocale);
      return newMessages
        ? { locale: newLocale, messages: newMessages }
        : prev;
    });
  };

  return (
    <LocaleContext.Provider value={{ locale: localeData.locale, changeLocale }}>
      <IntlProvider
        locale={localeData.locale}
        defaultLocale={defaultLocale}
        messages={localeData.messages}
      >
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
    </LocaleContext.Provider>
  );
}

export default App;
