import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import {Routes,Route} from "react-router-dom";
import { Toaster } from "react-hot-toast";

const  App = ()=> {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
