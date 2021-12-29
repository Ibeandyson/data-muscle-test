import React, { useState } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import useUser from "../hooks/useUser";
import { SelectInput, Input } from "./index";

const AddUserModal = () => {
  const { addUserModal, addUserModalState } = useUser();
  const closeModal = () => {
    addUserModal(false);
  };

  const [state, setState] = useState("");
  return (
    <div>
      <Modal
        show={addUserModalState}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="12" md="6">
              <Input
                lable="First Name"
                className="shadow-lg p-3 mb-5 bg-body rounded  border border-success"
                name="user"
                value={state}
                placeholder="Enter First Name"
                onChangeValue={(e: any) => setState(e.target.value)}
              />
            </Col>
            <Col sm="12" md="6">
              <Input
                lable="Last Name"
                className="shadow-lg p-3 mb-5 bg-body rounded  border border-success"
                name="user"
                value={state}
                placeholder="Enter Last Name"
                onChangeValue={(e: any) => setState(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => closeModal()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUserModal;
