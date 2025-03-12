import { FunctionComponent } from "react";
import { Card, CardImg, Modal } from "react-bootstrap";

interface DetailModalComponentProps {
  show: boolean;
  handleClose: () => void;
  url: string;
  handleShow: () => void;
}

const DetailModalComponent: FunctionComponent<DetailModalComponentProps> = ({
  show,
  handleClose,
  url,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>Detalle de la publicación</Modal.Header>
      <Modal.Body>
        <Card className="p0">
          <CardImg src={url} />
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default DetailModalComponent;
