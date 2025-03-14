import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router";
import foodBag from "../../../assets/food_bag.png";
import plateTable from "../../../assets/plate_table.jpg";
// interface LoginPageProps {

// }

interface FormData {
  username: string;
  password: string;
}

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Changed value: ${name}:${value}`);
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario login subido");
    let valid = true;
    // password > 5, <8
    const pLen = formData.password.length;
    const passwordValid = pLen > 5 && pLen < 8;
    console.log(pLen);
    valid = passwordValid;

    if (valid) {
      navigate("/test/home");
    }
  };
  return (
    <Container fluid className={styles.login_container}>
      <Row className={styles.login_row}>
        <Col md={7} className={`${styles.welcome_col}`}>
          <img src={foodBag} className={styles.logo} alt="logo" />
          <h1>Too good to go</h1>
          <h2>Food wasting solution</h2>
          <img src={plateTable} className={styles.plate_img} alt="food in table"/>
        </Col>
        <Col md={5} className={styles.login_col}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                name="username"
                onChange={handleChange}
                placeholder="Username"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Password"
              ></Form.Control>
            </Form.Group>
            <Button className="w-100 mt-2" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
