import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    //conferir se a senhas estão iguais
    if (form.password !== form.confirmPassword) {
        alert("Senhas incompatíveis")
        return
    }

    //disparo a requisição de cadastro para o meu servidor
    try {
        await axios.post("http://localhost:8080/user/sign-up", form)

        navigate("/login")
    } catch (error) {
        console.log(error)
    }

    // criar a requisição para enviar este novo usuário
    // requisição método POST
  }

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira um nome para identificação"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Endereço de e-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira o seu melhor endereço de e-mail"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira uma senha válida"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmar senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme a senha válida criada anteriormente"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="my-3" variant="dark" type="submit">
          Cadastrar usuário
        </Button>
      </Form>
      <Form.Text>
        Já possui cadastro? Faça já o
        <Link className="text-warning fw-bold text-decoration-none" to="/login">
          {" "}
          login
        </Link>
        .
      </Form.Text>
    </Container>
  );
}

export default SignUpPage;
