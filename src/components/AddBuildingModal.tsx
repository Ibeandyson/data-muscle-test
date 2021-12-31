import React, { useState, useEffect } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import useUser from "../hooks/useUser";
import useCreateId from "../hooks/useCreateId";
import { SelectInput, Input, Loader } from "./index";
import { countries } from "../global/countryList";

type formProps = {
  id: string;
  name: string;
  country: string;
};

const AddBuildingModal = () => {
  const { uid } = useCreateId();
  const { addBuildingModalState, loading, addBuildingModal,  addBuilding } = useUser();

  const [state, setState] = useState<formProps>({
    id: "",
    name: "",
    country: "",
  });

  const closeModal = () => {
    addBuildingModal(false);
    setState({
      id: "",
      name: "",
      country: "",
    });
  };

  const { name, country } = state;

  const onChangeHandler = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    addBuilding(state)
    closeModal();
  };

  useEffect(() => {
    setState({ ...state, id: uid });
  }, [uid]);

  return (
    <div>
      {loading && <Loader />}
      <Modal
        show={addBuildingModalState}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Building</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="12" md="6">
              <Input
                lable="Name"
                className="shadow-lg p-3 mb-5 bg-body rounded  border border-success"
                name="name"
                value={name}
                placeholder="Enter Building Name"
                onChangeValue={(e: any) => onChangeHandler(e)}
              />
            </Col>
            <Col sm="12" md="6">
              <SelectInput
                lable="Country"
                className="shadow-lg p-3 mb-5 bg-body rounded  border border-success"
                name="country"
                value={country}
                placeholder="Select Country"
                children={
                  <>
                    <option hidden>Select Country</option>
                    {countries?.map((data: any) => (
                      <option key={data.id} value={data.name}>
                        {data.name} 
                      </option>
                    ))}
                  </>
                }
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

export default AddBuildingModal;
