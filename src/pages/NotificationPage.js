import { Container, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../api/api";

function NotificationPage() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await api.get("/log/my-logs");
        setLogs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLogs();
  }, []);

  return (
    <Container className="mt-5">
      {!isLoading &&
        logs
          .map((log) => {
            return (
              <Card className="mb-3">
                {log.status} - Data: {log.date.slice(0, 10)}
              </Card>
            );
          })
          .reverse()}
    </Container>
  );
}

export default NotificationPage;
