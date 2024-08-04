import React, { useState } from "react";
import TextInput from "../components/textinput";
import CustomBtn from "../components/CustomBtn";
import { addOperator } from "../services/operatorService";
import { toast } from "react-toastify";

const AddOperator = () => {
  const [operatorData, setOperatorData] = useState({
    // operatorId: "",
    name: "",
    phoneNo: "",
    password: "",
  });

  const handleOperatorChange = (e) => {
    const { name, value } = e.target;
    setOperatorData({ ...operatorData, [name]: value });
  };

  const handleOperatorSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOperator(operatorData);
      console.log(operatorData);
      toast.success("Operator Added Successfully");
    } catch (error) {
      toast.error(error.response?.data || error.message)
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl w-full flex flex-col gap-5">
      <h3 className="text-xl font-bold mb-4 ">Add Operator</h3>
      <form className="bg-white p-5 rounded-lg flex flex-col gap-5 shadow-md" onSubmit={handleOperatorSubmit}>
        {/* <TextInput
          type="text"
          label="Operator ID"
          placeholder="Enter operator ID"
          required
          value={operatorData.operatorId}
          name="operatorId"
          onChange={handleOperatorChange}
        /> */}
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
