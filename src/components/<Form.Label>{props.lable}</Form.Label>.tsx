import React from "react";
import {Form} from 'react-bootstrap'

interface Props {
  name: string;
  data: any;
  onChangeValue: (param: any) => void;
  placeholder: string;
  value: string;
  className?: string;
  lable?: string;
}

const SelectInput = (props: Props) => {
  return (
    <div>
      <Form.Label>{props.lable}</Form.Label>
      <Form.Select
        className={props.className}
        value={props.value}
        name={props.name}
        onChange={props.onChangeValue}
      >
        <option hidden>{props.placeholder}</option>
        {props.data.map((data: any) => (
          <option key={data.id} value={data.name}>
            {data.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};
export default SelectInput;
