import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  name: string;
  onChangeValue: (param: any) => void;
  placeholder: string;
  value: string;
  className?: string;
  lable?: string;
}

const Input = (props: Props) => {
  return (
    <div>
      <Form.Label>{props.lable}</Form.Label>
      <Form.Control
        placeholder={props.placeholder}
        className={props.className}
        value={props.value}
        name={props.name}
        onChange={props.onChangeValue}
      />
    </div>
  );
};
export default Input;
