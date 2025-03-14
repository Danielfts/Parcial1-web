import { FunctionComponent, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import profilePhoto from "../../../assets/person_img.png";
import styles from "./HomePage.module.scss";
import { useNavigate } from "react-router";
import { useUserData } from "../hooks/hooks";
import DetailModalComponent from "../DetailModalComponent/DetailModalComponent";

// interface HomePageProps {}

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate("/pretest2/profile");
  };
  const postImagesUrl = "https://picsum.photos/350";
  const postImagesUrlLg = "https://picsum.photos/500";
  const { isSuccess, data } = useUserData();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  return (
    <>
      <Container className={`py-5`}>
        <Row>
          {isSuccess && data && (
            <>
              <Col lg={4} className={styles.profile_photo_container}>
                <img
                  src={profilePhoto}
                  className={styles.profile_photo}
                  alt="profile photo"
                  onClick={navigateToProfile}
                />
              </Col>
              <Col lg={8}>
                <Row>
                  <h1 className="display-5">{data.username}</h1>
                </Row>
                <Row>
                  <p>
                    <strong>{data.fullName}</strong> {data.description}
                  </p>
                </Row>
                <Row>
                  <a href={data.url}>Mi pagina personal</a>
                </Row>
                <Row>
                  <Col>
                    <strong>{data.posts}</strong> posts
                  </Col>
                  <Col>
                    <strong>{data.followers}</strong> followers
                  </Col>
                  <Col>
                    <strong>{data.followedAccounts}</strong> following
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
        <Row xs={2} sm={3} md={4} className="mt-5 gy-3">
          {Array(12)
            .fill(null)
            .map((_, index) => {
              return (
                <Col key={index}>
                  <Card className={`${styles.post_card} p0`} onClick={handleShow}>
                    <Card.Img src={postImagesUrl} className={styles.post_img} />
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
      <DetailModalComponent
        show={show}
        handleClose={handleHide}
        handleShow={handleShow}
        url={postImagesUrlLg}
      />
    </>
  );
};

export default HomePage;
