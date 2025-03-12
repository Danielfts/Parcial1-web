import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import TestPage from "./pages/TestPage/TestPage";
import PretestLoginPage from "./pages/pretest/LoginPage/LoginPage";
import PretestHomePage from "./pages/pretest/HomePage/HomePage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Pretest2HomePage from "./pages/pretest2/HomePage/HomePage";
import Pretest2ProfilePage from "./pages/pretest2/ProfilePage/ProfilePage";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestPage />} />
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
  );
}

export default App;
