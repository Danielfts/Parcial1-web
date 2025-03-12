import { FormEvent, FunctionComponent } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import styles from "./ProfilePage.module.scss";
import profilePhoto from "../../../assets/person_img.png";
import { useUserData } from "../hooks/hooks";
import { useNavigate } from "react-router";

const ProfilePage: FunctionComponent = () => {
  const isForm = Math.random() < 0.5;
  const navigate = useNavigate();
  const result = useUserData();
  const userData = result.data;
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/pretest2/home");
  };
  return (
    <Container fluid className={`${styles.profile_container} py-5`}>
      <Card className={styles.profile_card}>
        <Card.Body>
          <Row className="d-flex justify-content-center">
            <img
              src={profilePhoto}
              alt="profile photo"
              className={styles.profile_photo}
            />
          </Row>
          {userData && (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nombre de usuario</Form.Label>
                {isForm ? (
                  <Form.Control defaultValue={userData.username} />
                ) : (
                  <p>{userData.username}</p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Nombre completo</Form.Label>
                {isForm ? (
                  <Form.Control defaultValue={userData.fullName} />
                ) : (
                  <p>{userData.fullName}</p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Descripción del perfil</Form.Label>
                {isForm ? (
                  <Form.Control
                    as={"textarea"}
                    defaultValue={userData.description}
                  />
                ) : (
                  <p>{userData.description}</p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Url página personal</Form.Label>
                {isForm ? (
                  <Form.Control defaultValue={userData.url} />
                ) : (
                  <p>{userData.url}</p>
                )}
              </Form.Group>
              {isForm && (
                <div className={styles.button_row}>
                  <Button type="submit">Guardar Cambios</Button>
                </div>
              )}
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
