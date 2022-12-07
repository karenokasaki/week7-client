import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import api from "../api/api";

function ProfilePage() {
  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  function signOut() {
    //removendo o loggedInUser do localStorage
    localStorage.removeItem("loggedInUser");

    //atualizar o meu context
    setLoggedInUser(null);

    navigate("/");
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>IronRH</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/">
                Página inicial
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h1 className="text-muted">Nome do usuário</h1>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <img src={user.profilePic} alt="profile Pic" />
        <Row>
          <Col>
            <Button variant="primary">
              <Link className="nav-link" to="/edit-profile">
                Editar perfil
              </Link>
            </Button>
          </Col>
          <Col>
            <Button variant="danger">
              <Link className="nav-link" to="/delete-profile">
                Excluir perfil
              </Link>
            </Button>
          </Col>
          <Col>
            <Button variant="dark" onClick={signOut}>
              Sign Out
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfilePage;
