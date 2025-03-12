import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import TestPage from "./pages/TestPage/TestPage";
import PretestLoginPage from "./pages/pretest/LoginPage/LoginPage";
import PretestHomePage from "./pages/pretest/HomePage/HomePage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
