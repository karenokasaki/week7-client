import { Container, Form, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../api/api";

function TasksPage() {
  const [form, setForm] = useState({
    details: "",
    dateFin: "",
  });
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get("/task/my-tasks");
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTasks();
  }, [reload]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/task/create-task", form);
      setReload(!reload);
      setForm({
        details: "",
        dateFin: "",
      });
    } catch (error) {
      console.log(error);
      alert("Algo deu errado na criação da task");
    }
  }

  async function handleSelect(e, idTask) {
    await api.put(`/task/edit/${idTask}`, { status: e.target.value });
  }

  async function handleDeleteTask(e, idTask) {
    await api.delete(`/task/delete/${idTask}`);
    setReload(!reload);
  }

  async function handleTaskComplete(e, idTask) {
    await api.put(`/task/complete/${idTask}`);
    setReload(!reload);
  }

  console.log(tasks);

  return (
    <div>
      <Container className="border rounded mt-3">
        <Form>
          <Form.Group className="mt-3">
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escreva sua tarefa"
              name="details"
              value={form.details}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Data de Finalização</Form.Label>
            <Form.Control
              type="date"
              name="dateFin"
              value={form.dateFin}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" className="m-3" onClick={handleSubmit}>
            Salvar Tarefa
          </Button>
        </Form>
      </Container>

      <Container className="border rounded mt-3">
        <h1 className="mt-3">Tarefas</h1>
        {tasks.map((task) => {
          return (
            <Card key={task._id} className="m-4">
              <Card.Body>
                <p>{task.details}</p>

                {!task.complete && (
                  <Form.Select
                    defaultValue={form.status}
                    onChange={(e) => handleSelect(e, task._id)}
                  >
                    <option value="aberto">Em Aberto</option>
                    <option value="andamento">Em Andamento</option>
                    <option value="finalizando">Finalizando</option>
                  </Form.Select>
                )}
              </Card.Body>
              <Card.Footer>
                {task.complete ? (
                  <p>Tarefa finalizada no dia: {task.dateFin.slice(0, 10)}</p>
                ) : (
                  <p>Data final esperada: {task.dateFin.slice(0, 10)}</p>
                )}

                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => handleDeleteTask(e, task._id)}
                >
                  Excluir Task
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={(e) => handleTaskComplete(e, task._id)}
                >
                  Concluir Task
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </Container>
    </div>
  );
}

export default TasksPage;
