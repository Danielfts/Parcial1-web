import { BrowserRouter, Route, Routes } from "react-router"
import TestPage from "./pages/TestPage/TestPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
