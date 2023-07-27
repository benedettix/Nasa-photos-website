import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

const Desc = styled.p`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

const Ul = styled.ul`
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

const Button = styled.button`
  background-color: #f29494;
  padding: 10px 15px;
  outline: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin: 0 10px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.hover};
    color: ${({ theme }) => !theme.text};
  }
`;

const FooterDiv = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 15px 0;
`;

const Hr = styled.hr`
  color: ${({ theme }) => theme.text};
`;

// const LiEdit = styled(Li)`
//   color: #fff;
// `;
const SPAN = styled.span`
  color: #1976d2;
  cursor: pointer;
`;
function Footer() {
  return (
    <>
      <Hr></Hr>
      <FooterDiv>
        <Container>
          <Row className="justify-content-between">
            <Col
              className="d-flex justify-content-center align-items-center"
              md={3}
            >
              <Link to={"/search"}>
                <img style={{ width: "200px" }} src={Logo} alt="logo" />{" "}
              </Link>
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center"
              md={6}
            >
              <Desc style={{ color: "black" }}>
                <SPAN>Terms of Use</SPAN> - <SPAN>Privacy Policy © 2023</SPAN>{" "}
                Luka Benedetti
              </Desc>
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center"
              md={3}
            >
              <Ul>
                <NavLink to={"/search"}>
                  <Li>Home</Li>
                </NavLink>
              </Ul>
            </Col>
          </Row>
        </Container>
      </FooterDiv>
    </>
  );
}

export default Footer;
