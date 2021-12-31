import { Modal, Button } from "react-bootstrap";
import useUser from "../hooks/useUser";

interface Props {}

const DeleteModal = (props: Props) => {
  const {
    deleteBuildingModalState,
    idOfBuilding,
    deleteBuilding,
    deleteBuildingModal,
  } = useUser();

  const closeModal = () => {
    deleteBuildingModal(false, idOfBuilding);
  };

  const onDelelte = () => {
    deleteBuilding();
    deleteBuildingModal(false, idOfBuilding);
  };

  return (
    <div>
      <Modal show={deleteBuildingModalState} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Building</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're you sure want to delete this building?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            No
          </Button>
          <Button variant="success" onClick={onDelelte}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModal;
