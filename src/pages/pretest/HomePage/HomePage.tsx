import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router";
import bike from "../../../assets/bike_img.png";
import person from "../../../assets/person_img.png";
import run from "../../../assets/run_img.png";
import swim from "../../../assets/swim_img.png";
import SportCardComponent from "../SportCard/SportCardComponent";
import { ApiCardData, CardData } from "../types/CardData";
import UserData from "../types/UserData";
import styles from "./HomePage.module.scss";
import person_swimming from "../../../assets/person_swimming_sm2.jpg";
import person_running from "../../../assets/person_running_md.jpg";
import person_cycling from "../../../assets/person_biking.jpg";

interface HomePageRowProps {
  title: string;
  data: CardData[];
  handleShow: (modalData: CardData) => void;
}

const HomePageRow: FunctionComponent<HomePageRowProps> = ({
  title,
  data,
  handleShow,
}) => {
  return (
    <Col>
      <h1>{title}</h1>
      <Row className="gy-2">
        {data.map((item, index) => (
          <Col xs={12} md={6} key={index}>
            <SportCardComponent
              cardData={item}
              handleClick={() => handleShow(item)}
            ></SportCardComponent>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

const HomePageFooter: FunctionComponent = () => {
  const defaultUserData: UserData = {
    name: "Camilo Escobar",
    bestRunningTime: "1:30",
    bestSwimmingTime: "1:30",
    bestCyclingTime: "1:30",
  };
  const timeDataUrl = "https://my.api.mockaroo.com/time_data.json?key=c109b2f0";
  const fetchData = async () => {
    try {
      const response = await axios.get<UserData>(timeDataUrl);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return defaultUserData;
    }
  };
  const { isSuccess, data } = useQuery({
    queryKey: ["times"],
    queryFn: fetchData,
  });
  return (
    <Container fluid className={styles.footer}>
      <Row className={`${styles.footer_row} pt-3 text-center`}>
        {isSuccess ? (
          <>
            <Col>
              <img src={person} alt="person" />
            </Col>
            <Col>
              <span>{data.name}</span>
            </Col>
            <Col>
              <img src={bike} alt="bike" />
            </Col>
            <Col>
              <span>{data.bestCyclingTime}</span>
            </Col>
            <Col>
              <img src={swim} alt="swim" />
            </Col>
            <Col>
              <span>{data.bestSwimmingTime}</span>
            </Col>
            <Col>
              <img src={run} alt="run" />
            </Col>
            <Col>
              <span>{data.bestRunningTime}</span>
            </Col>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </Row>
    </Container>
  );
};

interface DetailModalProps {
  show: boolean;
  handleClose: () => void;
  data: CardData | null;
}

const DetailModal: FunctionComponent<DetailModalProps> = ({
  show,
  handleClose,
  data,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Detalle de ejercicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SportCardComponent cardData={data}></SportCardComponent>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const HomePage: FunctionComponent = () => {
  const cardDataUrl = "https://my.api.mockaroo.com/card_data.json?key=c109b2f0";
  // Hooks
  const [show, setShow] = useState<boolean>(false);
  const [modalData, setModalData] = useState<CardData | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = (modalData: CardData) => {
    setModalData(modalData);
    setShow(true);
  };
  // query
  const fetchData = async () => {
    const response = await axios.get<ApiCardData[]>(cardDataUrl);
    return response.data;
  };
  const { isSuccess, data } = useQuery({
    queryKey: ["card data"],
    queryFn: fetchData,
  });

  const [dataSwimming, setDataSwimming] = useState<CardData[]>([]);
  const [dataCycling, setDataCycling] = useState<CardData[]>([]);
  const [dataRunning, setDataRunning] = useState<CardData[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const swimData = data.map((item) => {
        const mappedItem: CardData = {
          ...item,
          sport: "swimming",
          imageUrl: person_swimming,
        };
        return mappedItem;
      });
      const runData = data.map((item) => {
        const mappedItem: CardData = {
          ...item,
          sport: "running",
          imageUrl: person_running,
        };
        return mappedItem;
      });
      const cyclingData = data.map((item) => {
        const mappedItem: CardData = {
          ...item,
          sport: "cycling",
          imageUrl: person_cycling,
        };
        return mappedItem;
      });
      setDataCycling(cyclingData);
      setDataSwimming(swimData);
      setDataRunning(runData);
    }
  }, [data, isSuccess]);

  return (
    <>
      <Container fluid="md" className="text-center py-3 ">
        <Row>
          <Link to={"/pretest/login"}>Cerrar sesión</Link>
        </Row>
        <Row>
          <HomePageRow
            title="Cycling"
            data={dataCycling}
            handleShow={handleShow}
          />
          <HomePageRow
            title="Running"
            data={dataRunning}
            handleShow={handleShow}
          />
          <HomePageRow
            title="Swimming"
            data={dataSwimming}
            handleShow={handleShow}
          />
        </Row>
      </Container>
      <HomePageFooter />
      <DetailModal show={show} handleClose={handleClose} data={modalData} />
    </>
  );
};

export default HomePage;
