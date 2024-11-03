import { useFormData } from "../utilities/useFormData";
import { useAuthState, useDbData, useDbUpdate } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isValidName, isValidPhoneNumber } from "../utilities/jsFunctions";

const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {text}
    </label>
    <input
      className="form-control"
      id={name}
      name={name}
      defaultValue={state.values?.[name]}
      onChange={change}
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({ message, disabled }) => {
  return (
    <div className="text-center">
      <button
        type="submit"
        className="btn btn-primary d-block mx-auto mb-2"
        disabled={disabled}
      >
        Submit
      </button>
      <div className="text-danger">{message}</div>
    </div>
  );
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateCourseData = (key, val) => {
  switch (key) {
    case "name":
      return isValidName(val) ? "" : "Please enter a valid full name.";
    case "email":
      return emailPattern.test(val) ? "" : "Please enter a valid email address."
    case "phone":
      return isValidPhoneNumber(val)
        ? ""
        : "Please enter a valid phone number.";
    default:
      return "";
  }
};



const UserProfileEditor = () => {
  const [user] = useAuthState();
  const [userData] = useDbData(user ? `/User/${user.uid}/Info` : null);
  const [update, result] = useDbUpdate(user ? `/User/${user.uid}/Info` : null);
  const [state, change, setValues] = useFormData(
    validateCourseData,
    userData || {}
  );
  // console.log("user", userData);

  useEffect(() => {
    if (userData) {
      setValues(userData);
    }
  }, [userData]);

  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
    }
  };
  const isFieldEmpty = (fieldName) => {
    if (!userData || !userData.hasOwnProperty(fieldName) || userData[fieldName] === "") {
      return true;
    }
    return false;
  };
  return (
    <form
      onSubmit={submit}
      noValidate
      className={state.errors ? "was-validated" : null}
    >
      <InputField name="name" text="Name" state={state} change={change} />
      {isFieldEmpty("name") && <div className="text-danger">Please enter the name info.</div>}
      
      <InputField name="email" text="Email" state={state} change={change} />
      {isFieldEmpty("email") && <div className="text-danger">Please enter the email info.</div>}
      
      <InputField
        name="phone"
        text="Phone Number"
        state={state}
        change={change}
      />
      {isFieldEmpty("phone") && <div className="text-danger">Please enter the phone number info.</div>}
      <ButtonBar message={result?.message} />
    </form>
  );
};

export default UserProfileEditor;
