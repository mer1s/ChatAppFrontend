import React,{useContext, useEffect} from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("main");
    }
  }, [user, navigate]);

  return (
    <Container fluid className="p-0 m-0 min-vh-100 bg-main flex-center">
      <div className="d-flex flex-md-row">
        <div className="me-1">
          <Link className="text-light text-decoration-none" to={"/login"}>
            <div className="home-link rounded bg-dark flex-center">
              <p className="display-6">Sign In</p>
            </div>
          </Link>
        </div>
        <div className="ms-1">
          <Link className="text-light text-decoration-none" to={"/register"}>
            <div className="home-link rounded bg-dark flex-center">
              <p className="display-6">Sign Up</p>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default HomeScreen;
