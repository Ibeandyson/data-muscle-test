import { useState, useEffect } from "react";
import "./App.css";
import {
  SelectInput,
  BuldingsCardList,
  AddUserModal,
} from "./components";
import { Container, Row, Col, Button } from "react-bootstrap";
import useUser from "./hooks/useUser";
import useCreateId from "./hooks/useCreateId";


const App = () => {
  const { createId } = useCreateId();
  const [state, setState] = useState("");
  const { addUserModal, getAllUsers, getSingelUserBuilding,  singelUserData, userData } = useUser();

  const openModal = () => {
    addUserModal(true);
    createId();
  };
  
  const onChangeHandler = (e: any) => {
    setState(e.target.value)
    getSingelUserBuilding(e.target.value)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className="page">
      <Container>
        <div className="d-grid gap-2 d-flex justify-content-center">
          <SelectInput
            className="shadow-lg p-3 mb-5 bg-body rounded user__select border border-success"
            name="user"
            value={state}
            placeholder="Select User"
            children={
              <>
                <option hidden>Select User</option>
                {userData?.map((data: any) => (
                  <option key={data.id} value={data.id}>
                    {data.firstName} {data.lastName}
                  </option>
                ))}
              </>
            }
            onChangeValue={(e: any) => onChangeHandler(e)}
          />
          <Button
            onClick={() => openModal()}
            className="shadow-lg add__user__btn"
            variant="success"
          >
            Add New User
          </Button>
        </div>

        <Row>
          <Col sm="12" md="4" lg="4">
            <div className="mb-5 mt-3">
              <BuldingsCardList
                data={[
                  { id: 1, name: "uche" },
                  { id: 2, name: "joy" },
                ]}
              />
            </div>
          </Col>
          <Col sm="12" md="8" lg="8">
            <div className="mb-5 mt-3"></div>
          </Col>
        </Row>
      </Container>
      <AddUserModal />
    </div>
  );
};

export default App;
