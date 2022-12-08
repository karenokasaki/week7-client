import { Button, Col, Container, Card, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import api from "../api/api";
import EditUser from "../components/EditUser";

function ProfilePage() {
  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: "",
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        setForm({ name: response.data.name });
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [reload]);

  function signOut() {
    //removendo o loggedInUser do localStorage
    localStorage.removeItem("loggedInUser");

    //atualizar o meu context
    setLoggedInUser(null);

    navigate("/");
  }

  async function handleDeleteUser() {
    try {
      await api.delete("/user/delete");
      signOut();
    } catch (error) {
      console.log(error);
      alert("Algo deu errado no delete do user");
    }
  }

  return (
    <div>
      <Container className="mt-5">
        <Row className="align-items-center mb-5">
          <Col>
            <Card>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </Card>
          </Col>
          <Col>
            <img src={user.profilePic} alt="profile Pic" className="rounded" />
          </Col>
        </Row>

        <Row>
          <Col>
            <EditUser
              form={form}
              setForm={setForm}
              setReload={setReload}
              reload={reload}
            />
          </Col>
          <Col>
            <Button variant="danger" onClick={handleDeleteUser}>
              Excluir perfil
            </Button>
          </Col>
          <Col>
            <Button variant="dark" onClick={signOut}>
              Sign Out
            </Button>
          </Col>
          <Col>
            <Link to="/tasks">
              <Button variant="dark">Minhas Tarefas</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfilePage;
