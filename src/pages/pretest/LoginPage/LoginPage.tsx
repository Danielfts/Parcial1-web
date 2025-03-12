import { FunctionComponent } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router";
// interface LoginPageProps {

// }

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/pretest/home");
  };
  return (
    <Container fluid className={styles.login_container}>
      <Row className={`d-flex justify-content-center`}>
        <Col className="col-auto">
          <Card className={styles.login_card}>
            <Card.Body>
              <Card.Title>Log In</Card.Title>
              <Form onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required></Form.Control>
                </Form.Group>
                <Button className="mt-2" type="submit">
                  Log In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
