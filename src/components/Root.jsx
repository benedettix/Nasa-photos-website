import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Routes, Route, useParams } from "react-router-dom";

import Loader from "./Loader/Loader";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Search from "../pages/Search/Search";
// import Search from "./Search/Search";

function Root({ setSearchDataValue }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/") {
      navigate("/search");
    }
  }, []);
  return (
    <>
      <header>
        <Navbar setSearchDataValue={setSearchDataValue} />
      </header>

      {/* {pathname === "/" ? <Search /> : null} */}

      <Outlet />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Root;
