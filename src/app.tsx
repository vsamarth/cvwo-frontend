import { ReactNode } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { useTypedSelector } from "./store";
import { useNavigate } from "react-router-dom";
const NotFound = () => <div>404</div>;
export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
