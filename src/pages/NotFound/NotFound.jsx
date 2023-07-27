import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.scss";
import Loader from "../../components/Loader/Loader";
// import Loader from "../../components/Loader/Loader";

const NotFound = () => {
  const loader = true;
  return (
    <div className="not-found">
      <div className="container">
        <div className="row">
          {loader ? (
            <>{<Loader />}</>
          ) : (
            <>
              <div className="col-md-9">
                <h1 className="heading">404</h1>
                <h2 className="subheading">Oops! Page not found</h2>
                <p className="text">
                  We're sorry, but the page you requested could not be found.
                  Please check your URL or use the search form below.
                </p>
                <Link to="/">
                  <button className="btn">Go to Home Page</button>
                </Link>
              </div>
              <div className="col-md-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/755/755014.png"
                  alt="404 page not found"
                  className="img-fluid"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
