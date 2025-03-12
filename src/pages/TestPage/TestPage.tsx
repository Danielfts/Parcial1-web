import { FunctionComponent } from "react";
import { Container, Row } from "react-bootstrap";

// interface TestPageProps {}

const TestPage: FunctionComponent = () => {
  return (
    <Container fluid="md">
      <Row className="">
        <h1 style={{textAlign: "center"}}>Monda</h1>
      </Row>
    </Container>
  );
};

export default TestPage;
