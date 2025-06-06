import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/userContext";
import LandingPage from "./pages/LandingPage/LandingPage";
import Transactions from "./pages/Dashboard/Transactions";

const App = () => {
  return(
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/logout" element={<Login/>} />
            <Route path="/login"  exact element={<Login/>} />
            <Route path="/signUp" exact element={<SignUp/>} />
            <Route path="/dashboard" exact element={<Home/>} />
            <Route path="/income" exact element={<Income/>} />
            <Route path="/expense" exact element={<Expense/>} />
            <Route path= "/transactions" exact element={<Transactions/>} />
            <Route path="*" element={<LandingPage/>} />
          </Routes>
          <Toaster
              toastOptions={{
                className: '',
                style: {
                  fontSize: '13px',
                },
              }}
          />
        </Router>
      </div>

    </UserProvider>
  )
}

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}