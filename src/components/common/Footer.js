import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import moviepop from "../img/moviepop.png";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="py-2 overflow-hidden bg-principal border-top border-dark text-center shadow mt-5">
      <Container>
        <article className="row">
          <div className="col-sm-12 col-md-12  mt-0 pt-0">
            <div className="nav d-flex align-items-center justify-content-center">
              <Link
                className="nav-link active text-gold fs-4 fw-bold px-0"
                aria-current="page"
                to="/"
              >
                <img
                  alt="moviePop logo"
                  src={moviepop}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{" "}
                MoviePop
              </Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-12  text-center">
            <h6 className="text-center px-0 mx-0">Seguinos</h6>
            <ul className="nav align-items-center justify-content-center fs-6">
              <li className="nav-item">
                <a
                  className="nav-link text-secondary pe-1"
                  href="https://m.facebook.com/?locale=es_ES"
                  target="_blank"
                >
                  <AiFillFacebook className="text-gold fs-2"></AiFillFacebook>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-secondary pe-1"
                  href="https://twitter.com/login?lang=es"
                  target="_blank"
                >
                  <AiFillTwitterSquare className="text-gold fs-2"></AiFillTwitterSquare>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-secondary pe-2"
                  href="https://www.youtube.com"
                  target="_blank"
                >
                  <AiFillYoutube className="text-gold fs-2"></AiFillYoutube>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-secondary pe-2"
                  href="https://www.instagram.com/?hl=es-la"
                  target="_blank"
                >
                  <AiFillInstagram className="text-gold fs-2"></AiFillInstagram>
                </a>
              </li>
            </ul>
          </div>
        </article>
        <p className="my-2">&copy;MoviePop2022</p>
      </Container>
    </footer>
  );
};

export default Footer;
