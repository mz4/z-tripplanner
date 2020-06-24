import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

interface IPropsInput {
  name: string,
  placeholder: string,
}

interface IPropsDate {
  name: string,
  placeholderText: string,
}

export const MyTextInput: React.FC<IPropsInput> = (props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input 
        className="text-input"
        autoComplete="off" 
        {...field} 
        {...props} 
      />
      {meta.touched && meta.error ? (
        <div className="error">
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const DatePickerField: React.FC<IPropsDate> = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <>
      <DatePicker
        className="text-input"
        autoComplete="off"
        dateFormat="dd/MM/yyyy" 
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
      />
      {meta.touched && meta.error ? (
        <div className="error">
          {meta.error}
        </div>
      ) : null}
    </>
  );
};
