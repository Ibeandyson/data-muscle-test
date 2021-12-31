import React from "react";
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

const BuldingsCardList = () => {
  const { createId } = useCreateId();
  const {
    userBuildings,
    addBuildingModal,
    deleteBuildingModal,
    editBuildingModal,
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
                <ListGroup.Item>
                  <Row>
                    <Col sm="6">{data?.name}</Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="d-flex justify-content-end"
                        aria-label="Basic example"
                      >
                        <Button
                          onClick={() => deleteBuildingModal(true, data.id)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => editBuildingModal(true, data.id)}
                          variant="success"
                        >
                          Edit
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
