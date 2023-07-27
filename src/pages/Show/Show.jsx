import { Container } from "@mui/system";
import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";
import Zoom from "react-img-zoom";

import TimeAgo from "react-timeago";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Loader from "../../components/Loader/Loader";
const IMG = styled.img`
  width: 450px;
  object-fit: cover;
  padding-bottom: 20px;
`;
const ZoomImg = styled.img`
  width: 150px;
  object-fit: cover;
  padding-bottom: 20px;
  padding-right: 30px;
`;

const Button = styled.button`
  background-color: #f29493;
  padding: 10px 15px;
  outline: none;
  border: none;
  color: #fff;
  width: 100%;
  font-size: 22px;
  transition: 0.2s all ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
const ProductWrapper = styled.div`
  padding: 20px;
`;
const H3 = styled.h3`
  font-size: 34px;
  font-weight: bold;
`;
const P = styled.p`
  color: black;
  font-size: 28px;
`;

const IconWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
`;
const ProductTitle = styled.h3`
  font-size: 36px;
  margin: 0;
  color: #1976d2;
`;

const ProductDescription = styled.p`
  font-size: 17px;
  color: black;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const ProductLocation = styled.p`
  font-size: 27px;
  color: black;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ProductPhotographer = styled.span`
  font-size: 19px;
  color: black;
  font-style: Italic;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ProductKeywords = styled.h3`
  font-size: 15px;
  color: gray;
  padding-top: 20px;
`;
const ProductDate = styled.h3`
  font-size: 17px;
  color: gray;
`;
function Show() {
  const { id } = useParams();

  let { data, loading, error, reFetch, setData } = useFetch(
    `https://images-api.nasa.gov/search?nasa_id=${id}`
  );

  let {
    data: imageData,
    loading: imageLoading,
    error: imageError,
    reFetch: imageReFetch,
    setData: imageSetData,
  } = useFetch(`https://images-api.nasa.gov/asset/${id}`);

  const navigate = useNavigate();

  return (
    <Container fluid="true" style={{ paddingBottom: "40px" }}>
      <IconWrapper onClick={() => navigate("/search")}>
        <KeyboardArrowLeftIcon style={{ fontSize: "60px", color: "black" }} />
        <span>Back to the Search</span>
      </IconWrapper>
      <Row>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          md={6}
        >
          <Col md={3}>
            {imageLoading && <Loader />}
            {imageData?.collection?.items?.slice(1, 4)?.map((img, i) => {
              return (
                <Zoom
                  key={i}
                  img={img?.href}
                  zoomScale={3}
                  width={150}
                  height={150}
                />
              );
            })}
          </Col>

          {/* <IMG src={data?.collection?.items[0]?.links[0]?.href}></IMG> */}
          {data?.collection?.items[0]?.links[0]?.href === undefined ? (
            ""
          ) : (
            <Zoom
              img={data?.collection?.items[0]?.links[0]?.href}
              zoomScale={3}
              width={450}
              height={450}
            />
          )}
        </Col>
        <Col md={6}>
          <ProductWrapper>
            {loading && <Loader />}

            {error && (
              <h5 style={{ color: "red", textAlign: "center" }}>{error}</h5>
            )}
            {imageError && (
              <h5 style={{ color: "red", textAlign: "center" }}>
                {imageError}
              </h5>
            )}
            <ProductDate>
              <TimeAgo
                date={
                  data?.collection?.items[0]?.data[0]?.date_created
                    ? new Date(
                        data?.collection?.items[0]?.data[0]?.date_created
                      ).toISOString()
                    : null
                }
              />
            </ProductDate>
            <ProductTitle>
              {data?.collection?.items[0]?.data[0]?.title.slice(0, 80)}
            </ProductTitle>
            <ProductLocation>
              {data?.collection?.items[0]?.data[0]?.location && "Location: "}
              {data?.collection?.items[0]?.data[0]?.location}
            </ProductLocation>
            <ProductDescription>
              {data?.collection?.items[0]?.data[0]?.description}.
            </ProductDescription>

            <ProductPhotographer>
              {data?.collection?.items[0]?.data[0]?.photographer &&
                "Photographer: "}
              {data?.collection?.items[0]?.data[0]?.photographer}
            </ProductPhotographer>

            <ProductKeywords>
              {data?.collection?.items[0]?.data[0]?.keywords && "Keywords: "}
              {data?.collection?.items[0]?.data[0]?.keywords?.map(
                (keyword, i) => {
                  return <span key={i}>{`${keyword}, `}</span>;
                }
              )}
            </ProductKeywords>
          </ProductWrapper>
        </Col>
      </Row>
    </Container>
  );
}

export default Show;
