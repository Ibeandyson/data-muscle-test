import React, { useState, useEffect } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import useUser from "../hooks/useUser";
import useCreateId from "../hooks/useCreateId";
import { SelectInput, Input, Loader } from "./index";

type formProps = {
  id: string;
  firstName: string;
  lastName: string;
  buildings: [];
};

const AddUserModal = () => {
  const { uid } = useCreateId();
  const { addUserModal, addUserToStorage, addUserModalState, loading } =
    useUser();

  const [state, setState] = useState<formProps>({
    id: "",
    firstName: "",
    lastName: "",
    buildings: [],
  });

  const closeModal = () => {
    addUserModal(false);
    setState({
      id: "",
      firstName: "",
      lastName: "",
      buildings: [],
    });
  };

  const { firstName, lastName } = state;

  const onChangeHandler = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    addUserToStorage([state]);
    closeModal();
  };

  useEffect(() => {
    setState({ ...state, id: uid });
  }, [uid]);

  return (
    <div>
      {loading && <Loader />}
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
                name="firstName"
                value={firstName}
                placeholder="Enter First Name"
                onChangeValue={(e: any) => onChangeHandler(e)}
              />
            </Col>
            <Col sm="12" md="6">
              <Input
                lable="Last Name"
                className="shadow-lg p-3 mb-5 bg-body rounded  border border-success"
                name="lastName"
                value={lastName}
                placeholder="Enter Last Name"
                onChangeValue={(e: any) => onChangeHandler(e)}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => onSubmit()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUserModal;
