import React, {ReactNode} from "react";
import { Form } from "react-bootstrap";

interface Props {
  name: string;
  onChangeValue: (param: any) => void;
  placeholder: string;
  value: string;
  className?: string;
  lable?: string;
  children: ReactNode
}

const SelectInput = (props: Props) => {
  return (
    <div>
      {props.lable !== undefined && <Form.Label>{props.lable}</Form.Label>}
      <Form.Select
        className={props.className}
        value={props.value}
        name={props.name}
        onChange={props.onChangeValue}
      >
        {props.children}
      </Form.Select>
    </div>
  );
};
export default SelectInput;
