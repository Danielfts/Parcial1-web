import { FunctionComponent } from "react";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import styles from "./DetailPage.module.scss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import menu from "../../../assets/menu.png";
import shopping_cart from "../../../assets/shopping_cart.png";
import store from "../../../assets/store.png";
import { FormattedMessage, useIntl } from "react-intl";

interface DetailPageProps {
  type: "menu" | "stores" | "cart";
}

interface FoodData {
  imageUrl: string;
  foodName: string;
}

const DetailPage: FunctionComponent<DetailPageProps> = ({ type }) => {
  const intl = useIntl();
  async function fetchFoodData() {
    const response = await axios.get<FoodData[]>(
      "https://gist.githubusercontent.com/Danielfts/fb5ac606e6a26c8bde565c261212bd9c/raw/92126f61dc3617000c32047100e765b5af0082c1/food_data.json"
    );

    const data = response.data;
    console.log(data);
    return data.slice(0, 4);
  }

  const { isSuccess, data } = useQuery({
    queryKey: ["foodData"],
    queryFn: fetchFoodData,
  });

  let title = "";
  let headerImg: string | null = "";
  switch (type) {
    case "stores":
      title = intl.formatMessage({id:"stores"});
      headerImg = store;
      break;
    case "cart":
      title = intl.formatMessage({id:"cart"});
      headerImg = shopping_cart;
      break;
    case "menu":
      title = intl.formatMessage({id:"menu"});
      headerImg = menu;
      break;

    default:
      break;
  }
  return (
    <Container fluid>
      <Row className={`${styles.header}`}>
        <Col xs={"auto"}>
          {headerImg && (
            <img
              className={styles.header_img}
              src={headerImg}
              alt="header logo"
            />
          )}
        </Col>
        <Col xs={"auto"}>
          <h1>{title}</h1>
        </Col>
        <Col xs={"auto"}>
          {headerImg && (
            <img
              className={styles.header_img}
              src={headerImg}
              alt="header logo"
            />
          )}
        </Col>
      </Row>
      <Row className="mt-3">
        <Carousel variant="dark">
          {isSuccess &&
            data.slice(0, 3).map((item, index) => (
              <Carousel.Item key={index}>
                <img
                  src={item.imageUrl}
                  className={`${styles.car_img} d-block w-100`}
                  alt="img"
                />
              </Carousel.Item>
            ))}
        </Carousel>
      </Row>
      <Row>
        <Link to="/test/home">
            <FormattedMessage id="homeGoBack"/>
        </Link>
      </Row>
      <Row>
        {isSuccess &&
          data.map((item, index) => (
            <Col key={index} md={3}>
              <Card className={styles.bot_card}>
                <Card.Img src={item.imageUrl} />
                <Card.Footer>
                  <h1>{item.foodName}</h1>
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default DetailPage;
