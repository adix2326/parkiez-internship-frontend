import React, { useState } from "react";
import TextInput from "../components/textinput";
import CustomBtn from "../components/CustomBtn";
import { addOperator } from "../services/operatorService";
import { toast } from "react-toastify";

const AddOperator = () => {
  const [operatorData, setOperatorData] = useState({
    name: "",
    phoneNo: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleOperatorChange = (e) => {
    const { name, value } = e.target;
    setOperatorData({ ...operatorData, [name]: value });

    switch (name) {
      case "name":
        validateName(value);
        break;
      case "phoneNo":
        validatePhoneNo(value);
        break;
      case "password":
        validatePassword(value);
        break;
      default:
        break;
    }
  };

  const validateName = (name) => {
    let nameError = "";
    if (name.trim().length < 3) {
      nameError = "Name must be at least 3 characters long";
    }
    setErrors((prevErrors) => ({ ...prevErrors, name: nameError }));
    return !nameError;
  };

  const validatePhoneNo = (phoneNo) => {
    let phoneError = "";
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNo)) {
      phoneError = "Phone number must be 10 digits";
    }
    setErrors((prevErrors) => ({ ...prevErrors, phoneNo: phoneError }));
    return !phoneError;
  };

  const validatePassword = (password) => {
    let passwordError = "";

    if (password.length < 8) {
      passwordError = "Password must be at least 8 characters long";
    } else {
      if (!/[A-Z]/.test(password)) {
        passwordError = "Password must contain at least one uppercase letter";
      }
      if (!/[a-z]/.test(password)) {
        passwordError = "Password must contain at least one lowercase letter";
      }
      if (!/[0-9]/.test(password)) {
        passwordError = "Password must contain at least one number";
      }
      if (!/[!@#$%^&*]/.test(password)) {
        passwordError = "Password must contain at least one special character";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
    return !passwordError;
  };

  const handleOperatorSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = validateName(operatorData.name);
    const isPhoneNoValid = validatePhoneNo(operatorData.phoneNo);
    const isPasswordValid = validatePassword(operatorData.password);

    if (!isNameValid || !isPhoneNoValid || !isPasswordValid) return;

    try {
      await addOperator(operatorData);
      toast.success("Operator Added Successfully");
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  const getBorderColor = (fieldName) => {
    if (errors[fieldName]) return "border-red-500";
    if (operatorData[fieldName] && !errors[fieldName]) return "border-green-500";
    return "border-gray-300";
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl w-full flex flex-col gap-5">
      <h3 className="text-xl font-bold mb-4">Add Operator</h3>
      <form
        className="bg-white p-5 rounded-lg flex flex-col gap-5 shadow-md"
        onSubmit={handleOperatorSubmit}
      >

       <div>
        <TextInput
            type="text"
            label="Name"
            placeholder="Enter operator name"
            required
            value={operatorData.name}
            name="name"
            onChange={handleOperatorChange}
            borderColor={getBorderColor("name")}
            error={errors.name}
          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-xs font-semibold pl-2">
              {errors.name}
            </p>
          )}
       </div>
       <div>
          <TextInput
            type="text"
            label="Phone Number"
            placeholder="Enter operator phone number"
            required
            value={operatorData.phoneNo}
            name="phoneNo"
            onChange={handleOperatorChange}
            borderColor={getBorderColor("phoneNo")}
            error={errors.phoneNo}
          />
          {errors.phoneNo && (
            <p className="text-red-500 mt-1 text-xs font-semibold pl-2">
              {errors.phoneNo}
            </p>
          )}
        </div>
        <div>
          <TextInput
            type="password"
            label="Password"
            placeholder="Enter operator password"
            required
            value={operatorData.password}
            name="password"
            onChange={handleOperatorChange}
            borderColor={getBorderColor("password")}
            error={errors.password}
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-xs font-semibold pl-2">
              {errors.password}
            </p>
          )}
        </div>
        <CustomBtn
          text="Add Operator"
          type="submit"
          textcolor="white"
          onClick={handleOperatorSubmit}
        />
      </form>
    </div>
  );
};

export default AddOperator;
