import { FunctionComponent } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./HomePage.module.scss";
import dummy_img from "../../../assets/person_img.png";
import { useNavigate } from "react-router";
// import bg from "../../../assets/food_table.avif";
// interface HomePageProps {

// }

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate();
  function handleNavigate(to: string) {
    return () => navigate(`/test/${to}`);
  }
  return (
    <Container fluid className={`${styles.home_container}`}>
      <Card className={`${styles.home_card} p-0`}>
        <Card.Body>
          <Row>
            <Col className={styles.card_col}>
              <div className={styles.card_item} onClick={handleNavigate("menu")}>
                <img className={styles.item_img} src={dummy_img} />
                <h1 className={styles.item_text}>Menu</h1>
              </div>
            </Col>
            <Col className={styles.card_col}>
              <div className={styles.card_item} onClick={handleNavigate("stores")}>
                <img className={styles.item_img} src={dummy_img} />
                <h1 className={styles.item_text}>Stores</h1>
              </div>
            </Col>
            <Col className={styles.card_col}>
              <div className={styles.card_item} onClick={handleNavigate("cart")}>
                <img className={styles.item_img} src={dummy_img} />
                <h1 className={styles.item_text}>Cart</h1>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomePage;
