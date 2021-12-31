import { useState, useEffect } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import useUser from "../hooks/useUser";
import useCreateId from "../hooks/useCreateId";
import { SelectInput, Input } from "./index";
import { countries } from "../global/countryList";

type formProps = {
  id: string;
  name: string;
  country: string;
};

const EditBuildingModal = () => {
  const { uid } = useCreateId();
  const {
    editBuildingModalState,
    idOfBuilding,
    oneBuilding,
    editBuildingModal,
    editBuilding,
  } = useUser();

  const [state, setState] = useState<formProps>({
    id: "",
    name: "",
    country: "",
  });

  const closeModal = () => {
    editBuildingModal(false, editBuildingModalState, oneBuilding);
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
    editBuilding({
      id: idOfBuilding,
      name: name,
      country: country,
    });
    closeModal();
  };

  useEffect(() => {
    setState({
      id: oneBuilding.id,
      name: oneBuilding.name,
      country: oneBuilding.country,
    });
  }, [oneBuilding]);



  return (
    <div>
      <Modal
        show={editBuildingModalState}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Eidt Building
          </Modal.Title>
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

export default EditBuildingModal;
