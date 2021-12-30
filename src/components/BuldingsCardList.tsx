import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import useUser from "../hooks/useUser";
import useCreateId from "../hooks/useCreateId";

const BuldingsCardList = () => {
  const { createId } = useCreateId();
  const { userBuildings, addBuildingModal } = useUser();

  const openModal = () => {
    addBuildingModal(true);
    createId();
  };

  return (
    <div>
      <Card className="shadow-lg">
        <Card.Header className="  d-flex justify-content-end">
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
                <ListGroup.Item>{data?.name}</ListGroup.Item>
              ))}
            </div>
          )}
        </ListGroup>
      </Card>
    </div>
  );
};

export default BuldingsCardList;
