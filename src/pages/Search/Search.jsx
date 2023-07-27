import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { TextField } from "@mui/material";
import "./Search.scss";
import Loader from "../../components/Loader/Loader";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const FilterButton = styled.button`
  padding: 10px 17px;
  border: 1px solid lightgray;
  border-radius: 40px;
  font-weight: bold;
  color: #1976d2;
  width: 200px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  background-color: white;
  border: 1px solid #1976d2;

  &:hover {
    background-color: #1976d2;
    color: white;
  }
`;

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Header = styled.h3`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 55px;
  margin: 0;
  margin-bottom: 30px;
  text-align: center;
`;
const P = styled.p`
  color: ${({ theme }) => theme.text};
  margin: 0;
  text-align: center;

  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='${({ theme }) =>
    theme.text}' height='34' viewBox='0 0 24 24' width='34' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;

  padding: 1rem;
  padding-right: 2rem;
  border: 1px solid black;
  border-color: ${({ theme }) => theme.soft};
  transition: 0.2s all ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.softHover};
  }
`;

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

const SelectBoxes = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='${({ theme }) =>
    theme.text}' height='34' viewBox='0 0 24 24' width='34' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;

  border-radius: 2px;
  margin-right: 2rem;
  padding: 1rem;
  padding-right: 2rem;
  border: 1px solid gray;
  cursor: pointer;
  outline: none;
  transition: 0.2s all ease-in-out;
  color: ${({ theme }) => theme.text};
  border-color: ${({ theme }) => theme.soft};
  &:hover {
    background-color: ${({ theme }) => theme.softHover};
  }
`;

const SelectBoxesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PriceBox = styled.div`
  position: relative;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 10px 15px;
  margin: 5px;
  outline: none;
  background-color: #fff;
  border: 1px solid lightgray;
  width: 130px;
`;

const InputHolder = styled.div`
  padding: 20px;
  position: absolute;
  top: 60px;
  width: 250px;

  background-color: #fff;
  -webkit-box-shadow: 0px 0px 160px -36px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 160px -36px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 160px -36px rgba(0, 0, 0, 0.75);
`;

const Option = styled.option`
  color: black;

  &:disabled {
    background-color: lightgray;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Item = styled.div`
  width: 300px;
  padding: 30px;
  cursor: pointer;
  transition: 0.2s all ease-in-out;

  @media (max-width: 768px) {
    width: 255px;
  }

  @media (max-width: 590px) {
    width: 220px;
  }
  @media (max-width: 500px) {
    width: 100%;
  }

  &:hover {
    background-color: lightgray};
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  padding: 15px;
  height: 250px;
`;

const ItemTitle = styled.p`
  color: #1976d2;
  font-size: 21px;
`;

const ItemLocation = styled.p`
  color: black;
  font-size: 15px;
`;

const ItemPhotographer = styled.p`
  color: gray;
  font-size: 19px;
  font-style: italic;
  padding-top: 30px;
`;

const ItemHolder = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SPAN = styled.span`
  color: #1976d2;
  font-size: 70px;
  letter-spacing: 0px;
  font-family: "Nasa", sans-serif;
`;
const StyledTextFieldLeft = styled(TextField)`
  margin-right: 6px !important;
  @media (max-width: 768px) {
    margin: 10px 0 !important;
  }
`;
const StyledTextFieldRight = styled(TextField)`
  margin-left: 6px !important;
  @media (max-width: 768px) {
    margin: 10px 0 !important;
  }
`;
function Search({ searchDataValue }) {
  // const [startPage, setStartPage] = useState(1);
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [messageError, setMessageError] = useState("");
  let { data, loading, error, reFetch, setData, setLoading, setError } =
    useFetch(
      `https://images-api.nasa.gov/search?q=&page=1&page_size=12&media_type=image`
    );
  const changePage = async (side) => {
    if (side === "back") {
      setCurrentPage((prev) => prev - 1);
      setLoading(true);
      try {
        const res = await axios.get(
          `https://images-api.nasa.gov/search?q=${encodeURIComponent(
            searchDataValue
          )}${
            startDate && endDate
              ? `&year_start=${startDate}&year_end=${endDate}`
              : ""
          }&page=${currentPage - 1}&page_size=12&media_type=image`
        );

        setData(res.data);
      } catch (err) {
        setError("Couldn't fetch the data");
      }
      setLoading(false);

      return;
    }

    if (side === "forward") {
      setCurrentPage((prev) => prev + 1);

      setLoading(true);
      try {
        const res = await axios.get(
          `https://images-api.nasa.gov/search?q=${encodeURIComponent(
            searchDataValue
          )}${
            startDate && endDate
              ? `&year_start=${startDate}&year_end=${endDate}`
              : ""
          }&page=${currentPage + 1}&page_size=12&media_type=image`
        );

        setData(res.data);
      } catch (err) {
        setError("Couldn't fetch the data");
      }
      setLoading(false);
      return;
    }
  };
  useEffect(() => {
    const call = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://images-api.nasa.gov/search?q=${encodeURIComponent(
            searchDataValue
          )}&page=1&page_size=12&media_type=image`
        );

        setCurrentPage(1);
        setData(res.data);
      } catch (err) {
        setError("Couldn't fetch the data");
      }
      setLoading(false);
    };

    call();
  }, [searchDataValue]);

  const currentYear = new Date().getFullYear();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // You can add further validation here if needed.
    if (value !== "" && (isNaN(value) || value < 0 || value > currentYear)) {
    } else {
      if (name === "startDateValue") {
        setStartDateValue(value);
      } else if (name === "endDateValue") {
        setEndDateValue(value);
      }
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const checkError = (start, end) => {
    const startDateValue = parseInt(start);
    const endDateValue = parseInt(end);

    if (!startDateValue || !endDateValue) {
      setMessageError("Fields can't be empty");
      return;
    }
    if (startDateValue > endDateValue) {
      setMessageError("Please enter a date between 0 and " + currentYear);
      return;
    }
    if (startDateValue > endDateValue) {
      setMessageError("Start date cannot be greater than end date.");
      return;
    }
    setMessageError("");
    const call = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://images-api.nasa.gov/search?q=${encodeURIComponent(
            searchDataValue
          )}&year_start=${startDate}&year_end=${endDate}&page=1&page_size=12&media_type=image`
        );
        setCurrentPage(1);
        setData(res.data);
      } catch (err) {
        setError("Couldn't fetch the data");
      }
      setLoading(false);
    };

    call();
  };

  return (
    <>
      <Container>
        <Header>
          <SPAN>NASA</SPAN> Photo Gallery
        </Header>

        <Wrapper>
          <hr
            style={{
              color: `${"black"}`,
              width: "100%",
            }}
          ></hr>

          <div className="d-sm-flex d-block filter__holder">
            <StyledTextFieldLeft
              id="outlined-basic"
              label="Year Start"
              variant="outlined"
              className="input-left"
              value={startDate}
              onChange={handleStartDateChange}
              error={!!messageError} // Set error prop based on the presence of an error message
            />
            <StyledTextFieldRight
              className="input-right"
              id="outlined-basic"
              label="Year End"
              variant="outlined"
              value={endDate}
              onChange={handleEndDateChange}
              error={!!messageError} // Set error prop based on the presence of an error message
            />
          </div>

          <hr
            style={{
              color: `${"black"}`,
              width: "100%",
            }}
          ></hr>
        </Wrapper>
        <p className="error">{messageError}</p>
        <FilterWrapper>
          {" "}
          <FilterButton onClick={() => checkError(startDate, endDate)}>
            Apply a Filter
          </FilterButton>
        </FilterWrapper>
        <hr
          style={{
            color: `${"black"}`,
            width: "100%",
            borderTop: "2px solid",
            opacity: "1",
            marginBottom: "50px",
          }}
        ></hr>

        {error && (
          <h5 style={{ color: "red", textAlign: "center" }}>{error}</h5>
        )}
        {loading ? (
          <Loader />
        ) : (
          <ItemWrapper>
            {data?.collection?.items?.length === 0 ? (
              <ItemTitle style={{ margin: "0 auto" }}>
                There's no search results by that title
              </ItemTitle>
            ) : (
              <>
                <div className="buttons__holder">
                  <button
                    onClick={() => changePage("back")}
                    disabled={currentPage === 1}
                  >
                    {currentPage - 1} <ArrowBack />
                  </button>
                  <p>Page: {currentPage}</p>
                  <button
                    onClick={() => changePage("forward")}
                    disabled={data?.collection?.items?.length !== 12 && true}
                  >
                    {currentPage + 1} <ArrowForward />
                  </button>
                </div>
                {data?.collection?.items?.map((product, i) => {
                  return (
                    <Link key={i} to={`/show/${product.data[0].nasa_id}`}>
                      <Item>
                        <Img src={product.links[0].href} />
                        <ItemTitle>{product.data[0].title}</ItemTitle>

                        <ItemLocation>{product.data[0].location}</ItemLocation>
                        <ItemPhotographer>
                          Photographer: {product.data[0].photographer}
                        </ItemPhotographer>
                      </Item>
                    </Link>
                  );
                })}
                <div className="buttons__holder">
                  <button
                    onClick={() => changePage("back")}
                    disabled={currentPage === 1}
                  >
                    {currentPage - 1} <ArrowBack />
                  </button>
                  <p>Page: {currentPage}</p>
                  <button
                    onClick={() => changePage("forward")}
                    disabled={data?.collection?.items?.length !== 12 && true}
                  >
                    {currentPage + 1} <ArrowForward />
                  </button>
                </div>
              </>
            )}
          </ItemWrapper>
        )}
      </Container>
    </>
  );
}

export default Search;
