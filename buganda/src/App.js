import React from "react"
import { AuthProvider } from './contexts/AuthContext'
import Signup from "./pages/signup"
import Login from "./pages/login"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Kings from "./pages/Kings"
import Registration from "./pages/Registration"
import "./index.css"
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PrivateRoutes } from "./util/PrivateRoutes"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/Kings" element={<Kings/>}/>
          </Route>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
