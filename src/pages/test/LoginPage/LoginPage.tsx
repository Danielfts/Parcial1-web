import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router";
import foodBag from "../../../assets/food_bag.png";
import plateTable from "../../../assets/plate_table.jpg";
import { FormattedMessage, useIntl } from "react-intl";
// interface LoginPageProps {

// }

interface FormData {
  username: string;
  password: string;
}

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const usernamePlaceholder = intl.formatMessage({ id: "username" });
  const passwordPlaceholder = intl.formatMessage({ id: "password" });
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
    const form = e.currentTarget;
    const valid = form.checkValidity();
    // password > 5, <8
    const pLen = formData.password.length;
    console.log(pLen);

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
          <h2>
            <FormattedMessage id="slogan" />
          </h2>
          <img
            src={plateTable}
            className={styles.plate_img}
            alt="food in table"
          />
        </Col>
        <Col md={5} className={styles.login_col}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                required
                name="username"
                onChange={handleChange}
                placeholder={usernamePlaceholder}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                required
                name="password"
                type="password"
                minLength={6}
                maxLength={7}
                onChange={handleChange}
                placeholder={passwordPlaceholder}
              ></Form.Control>
              <small style={{ color: "white" }}> 
                <FormattedMessage id="forgotPassword"/>
              </small>
            </Form.Group>
            <Button className="w-100 mt-2" type="submit">
              <FormattedMessage id="login"/>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
