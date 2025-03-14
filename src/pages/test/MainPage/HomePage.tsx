import { FunctionComponent } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import menu from "../../../assets/menu.png";
import shopping_cart from "../../../assets/shopping_cart.png";
import store from "../../../assets/store.png";
import styles from "./HomePage.module.scss";
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
        <Card.Body className={styles.card_body}>
          <Row className={styles.card_row}>
            <Col className={styles.card_col}>
              <div
                className={styles.card_item}
                onClick={handleNavigate("menu")}
              >
                <img className={styles.item_img} src={menu} />
                <h1 className={styles.item_text}>Menu</h1>
              </div>
            </Col>
            <Col className={styles.card_col}>
              <div
                className={styles.card_item}
                onClick={handleNavigate("stores")}
              >
                <img className={styles.item_img} src={store} />
                <h1 className={styles.item_text}>Stores</h1>
              </div>
            </Col>
            <Col className={styles.card_col}>
              <div
                className={styles.card_item}
                onClick={handleNavigate("cart")}
              >
                <img className={styles.item_img} src={shopping_cart} />
                <h1 className={styles.item_text}>Cart</h1>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleNavigate("login")}>Volver a login</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default HomePage;
