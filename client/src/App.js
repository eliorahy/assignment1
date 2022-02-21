import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
      </Routes>
    </BrowserRouter>
  );
}
