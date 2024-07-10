import React, { useState } from "react";
import TextInput from "../components/textinput";
import CustomBtn from "../components/CustomBtn";
import { addOperator } from "../services/operatorService";

const AddOperator = () => {
  const [operatorData, setOperatorData] = useState({
    operatorId: "",
    name: "",
    phoneNo: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleOperatorChange = (e) => {
    const { name, value } = e.target;
    setOperatorData({ ...operatorData, [name]: value });
  };

  const handleOperatorSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await addOperator(operatorData);
      console.log(operatorData);
      setSuccess("Operator added successfully");
    } catch (error) {
      setError("Failed to add operator: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl w-11/12 shadow-md flex flex-col gap-5">
      <h3 className="text-xl font-bold mb-4 text-center">Add Operator</h3>
      <form onSubmit={handleOperatorSubmit}>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <TextInput
          type="text"
          label="Operator ID"
          placeholder="Enter operator ID"
          required
          value={operatorData.operatorId}
          name="operatorId"
          onChange={handleOperatorChange}
        />
        <TextInput
          type="text"
          label="Name"
          placeholder="Enter operator name"
          required
          value={operatorData.name}
          name="name"
          onChange={handleOperatorChange}
        />
        <TextInput
          type="text"
          label="Phone Number"
          placeholder="Enter operator phone number"
          required
          value={operatorData.phoneNo}
          name="phoneNo"
          onChange={handleOperatorChange}
        />
        <TextInput
          type="password"
          label="Password"
          placeholder="Enter operator password"
          required
          value={operatorData.password}
          name="password"
          onChange={handleOperatorChange}
        />
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
