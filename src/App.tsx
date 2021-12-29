import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SelectInput, Input, BuldingsCardList, AddUserModal } from "./components";
import { Container, Row, Col, Button } from "react-bootstrap";
import useUser from "./hooks/useUser";


const App = () => {
  const [state, setState] = useState("");
  const { addUserModal } = useUser();
  const openModal  = () => {
    addUserModal(true)
  }
  return (
    <div className="page">
      <Container>
        <div className="d-grid gap-2 d-flex justify-content-center">
          <SelectInput
            className="shadow-lg p-3 mb-5 bg-body rounded user__select border border-success"
            name="user"
            value={state}
            placeholder="Select User"
            data={[
              { id: 1, name: "uche" },
              { id: 2, name: "joy" },
            ]}
            onChangeValue={(e: any) => setState(e.target.value)}
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
      <AddUserModal/>
    </div>
  );
}

export default App;
