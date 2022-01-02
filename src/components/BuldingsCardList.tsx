import {
  Card,
  ListGroup,
  Button,
  Col,
  Row,
  ButtonGroup,
} from "react-bootstrap";
import useUser from "../hooks/useUser";
import useCreateId from "../hooks/useCreateId";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import {GiPositionMarker} from "react-icons/gi";

const BuldingsCardList = () => {
  const { createId } = useCreateId();
  const {
    userBuildings,
    addBuildingModal,
    deleteBuildingModal,
    editBuildingModal,
    setMapData,
  } = useUser();

  const openModal = () => {
    addBuildingModal(true);
    createId();
  };

  return (
    <div>
      <Card className="shadow-lg">
        <Card.Header className="d-flex justify-content-end">
          <Button
            onClick={() => openModal()}
            className="shadow-lg add__building__btn"
            variant="success"
          >
            Add Building
          </Button>
        </Card.Header>
        <ListGroup className="p-1" variant="flush">
          {userBuildings.length < 1 ? (
            <div className="text-center mt-3">
              <p>No Building Data</p>
            </div>
          ) : (
            <div>
              {userBuildings?.map((data: any) => (
                <ListGroup.Item key={data.id}>
                  <Row>
                    <Col sm="6">
                      <p>
                        <b>{data?.name}</b>
                      </p>
                      <p style={{fontSize: "12px"}}>
                       <GiPositionMarker size={17} color="red"/> {data?.country}
                      </p>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="d-flex justify-content-end"
                        aria-label="Basic example"
                      >
                        <Button
                          onClick={() => setMapData(data.country)}
                          variant="success"
                        >
                          <AiFillEye color="white" />
                        </Button>
                        <Button
                          onClick={() => deleteBuildingModal(true, data.id)}
                          variant="danger"
                        >
                          <AiFillDelete color="white" />
                        </Button>
                        <Button
                          onClick={() => editBuildingModal(true, data.id, data)}
                          variant="warning"
                        >
                          <AiFillEdit color="white" />
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </div>
          )}
        </ListGroup>
      </Card>
    </div>
  );
};

export default BuldingsCardList;
