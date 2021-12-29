import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

interface Props {
  data: any;
}

const BuldingsCardList = (props: Props) => {
  return (
    <div>
      <Card className="shadow-lg ">
        <Card.Header className="  d-flex justify-content-end">
          <Button className="shadow-lg add__building__btn" variant="success">
            Add Building
          </Button>
        </Card.Header>
        <ListGroup className="p-1" variant="flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default BuldingsCardList;
