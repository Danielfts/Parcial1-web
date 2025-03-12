import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import styles from "./SportCardComponent.module.scss";
import defaultImgUrl from "../../../assets/person_running.jpg";
import { CardData } from "../types/CardData";

interface SportCardComponentProps {
  cardData: CardData | null;
  handleClick?: () => void;
}

const SportCardComponent: FunctionComponent<SportCardComponentProps> = ({
  cardData,
  handleClick,
}) => {
  const mockCardData: CardData = {
    sport: "Running",
    city: "Bogotá",
    distanceKm: 20,
    time: "1:30",
    imageUrl: null,
  };
  const data = cardData || mockCardData; 
  const imgUrl = data.imageUrl || defaultImgUrl;
  const clickStyle = handleClick ? styles.sport_card_clickable : "";
  return (
    <Card
      className={`${styles.sport_card} ${clickStyle}`}
      onClick={handleClick}
    >
      <Card.Img className={styles.sport_img} src={imgUrl} />
      <Card.Body className={styles.card_body}>
        <Card.Title>{data.sport} Session</Card.Title>
        <Card.Text>Recorrido alrededor de la bahía de {data.city}</Card.Text>
        <Card.Text>
          {`${data.distanceKm} k - ${data.time}h`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SportCardComponent;
