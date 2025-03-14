import co from "@/assets/colombia.png";
import us from "@/assets/united-states.png";
import LocaleContext from "@/context/LocaleContext";
import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useContext,
  useState,
} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router";
import foodBag from "../../../assets/food_bag.png";
import plateTable from "../../../assets/plate_table.jpg";
import styles from "./LoginPage.module.scss";

interface LocaleControlsProps {
  changeLocale: (_: string) => void;
  locale: string;
}

const LocaleControls: FunctionComponent<LocaleControlsProps> = ({
  changeLocale,
  locale,
}) => {
  return (
    <div className={styles.locale_controls}>
      <Button
        variant={"light"}
        onClick={() => changeLocale("es")}
        className={`me-2`}
        disabled={locale === "es"}
      >
        <img src={co} className={styles.country_flag} alt="spanish" />
      </Button>
      <Button
        variant={"light"}
        onClick={() => changeLocale("en")}
        disabled={locale === "en"}
      >
        <img src={us} className={styles.country_flag} alt="english" />
      </Button>
    </div>
  );
};

interface FormData {
  username: string;
  password: string;
}

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { changeLocale, locale } = useContext(LocaleContext);
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
          <h1>
            <FormattedMessage id="companyName" />
          </h1>
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
          <LocaleControls changeLocale={changeLocale} locale={locale} />
          <Form onSubmit={handleSubmit} className={styles.login_form}>
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
                <FormattedMessage id="forgotPassword" />
              </small>
            </Form.Group>
            <Button className="w-100 mt-2" type="submit">
              <FormattedMessage id="login" />
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
