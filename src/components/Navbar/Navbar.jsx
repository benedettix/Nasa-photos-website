import React, { useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import styled from "styled-components";
import logo from "../../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./Navbar.scss";
import { Container } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 45px 100px;
  @media (max-width: 768px) {
    padding: 30px 0;
  }
`;

const Button = styled.div`
  padding: 10px 17px;
  border: 1px solid lightgray;
  border-radius: 40px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  border-left: none;
  &:hover {
    background-color: #1976d2;
    color: white;
  }
`;
const ColFive = styled.div`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColTwo = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ColSix = styled.div`
  flex: 6;
  display: flex;

  align-items: center;
`;

const Img = styled.img`
  width: 200px;
`;

export const Ul = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;
`;
export const Li = styled.li`
  text-decoration: none;
  padding: 7px 15px;
  transition: all 0.2s ease-in-out;
  color: "black";
  border: 1px solid #1976d2;
  border-radius: 2px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #1976d2;
    color: white;
  }
`;

const EditedMenuIcon = styled(MenuIcon)`
  color: ${({ theme }) => theme.text};
  width: 2em !important;
  height: 2em !important;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #f2949478;
  }
`;

const Hamburger = styled.div`
  color: ${({ theme }) => theme.text};
  width: 500px;
  background-color: white;
  position: fixed;
  top: 0;
  height: 100vh;
  z-index: 999;
  transition: all 0.5s ease-in-out;
`;

const HamburgerWrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  list-style: none;
  font-size: 30px;
  height: 100%;
`;

const ImgHolder = styled.div`
  padding: 30px;
  justify-cotnent: flex-end;
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
`;

const FullWidthTextField = styled(TextField)`
  width: 100%;

  .MuiInputBase-root {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

function Navbar({ setSearchDataValue }) {
  const [hamOpen, setHamOpen] = useState(false);
  const { pathname } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  // const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(
  //   searchTerm
  // )}&media_type=image`;
  // let { data, loading, error, reFetch, setData } = useFetch(apiUrl);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    navigate("/search");
    setSearchDataValue(searchTerm);
  };
  function handleSearchInputChange(e) {
    setSearchTerm(e.target.value);
  }
  useEffect(() => {
    setHamOpen(false);
  }, [pathname]);

  return (
    <>
      <Container>
        <Overlay
          onClick={() => setHamOpen(!hamOpen)}
          style={!hamOpen ? { width: "0" } : { width: "100%" }}
        >
          <Hamburger style={!hamOpen ? { left: "-500px" } : { left: "0" }}>
            <HamburgerWrapper>
              <CloseIcon
                style={{
                  color: `${"black"}`,
                  fontSize: "40px",
                  alignSelf: "flex-end",
                  cursor: "pointer",
                  marginBottom: "30px",
                }}
                onClick={() => setHamOpen(!hamOpen)}
              ></CloseIcon>
              <NavLink to={"/search"}>
                <Li>Home</Li>
              </NavLink>

              <ImgHolder>
                <Link to={"/search"}>
                  <Img src={logo} alt="logo" />{" "}
                </Link>
              </ImgHolder>
            </HamburgerWrapper>
          </Hamburger>
        </Overlay>

        <Nav>
          <ColTwo>
            {" "}
            <EditedMenuIcon onClick={() => setHamOpen(!hamOpen)} />
            <Link to={"/search"}>
              <Img src={logo} alt="logo" />{" "}
            </Link>
          </ColTwo>

          <ColSix>
            <FullWidthTextField
              id="outlined-basic"
              label={<SearchIcon />}
              placeholder="Search"
              variant="outlined"
              onChange={(e) => handleSearchInputChange(e)}
            />
            <Button onClick={(e) => handleSearch(e)} variant="contained">
              <SearchIcon fontSize="large" />
            </Button>
          </ColSix>

          <ColTwo>
            <Ul>
              <NavLink to={"/search"}>
                <Li>Home</Li>
              </NavLink>
            </Ul>
          </ColTwo>
        </Nav>
      </Container>
    </>
  );
}

export default Navbar;
