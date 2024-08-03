import React, { useState } from 'react';
import TextInput from '../components/textinput';
import CustomBtn from '../components/CustomBtn';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {makeExit} from '../services/makeExitService'

const MakeExit = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleNo: ''
  });

  const [errors, setErrors] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [checked, setChecked] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'vehicleNo':
        const vehicleNoPattern = /^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/;
        if (!vehicleNoPattern.test(value)) {
          error = "Invalid Vehicle Registration Number Format";
        }
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // const handleCheck = async () => {
  //   setLoading(true);
    
  //   try {
  //     // Assume fetchVehicleDetails is a function that fetches the details from the backend
  //     const vehicleDetails = await fetchVehicleDetails(formData.vehicleNo);

  //     // Update formData with the fetched details
  //     setFormData({
  //       ...formData,
  //       ...vehicleDetails,
  //     });

  //     // Mark the vehicle as checked
  //     setChecked(true);
  //   } catch (error) {
  //     setErrors({ submit: error.message || 'An error occurred while checking vehicle details.' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    // const allValid = Object.keys(formData).every(field => validateField(field, formData[field]));
    // if (!allValid) {
    //   setLoading(false);
    //   return;
    // }

    try {
      console.log(formData);
      await makeExit(formData);
      navigate('/dashboard');
      toast.success("Exit Done !!")
    } catch (error) {
      setErrors({ submit: error.message || 'An error occurred while processing your request.' });
      toast.error(error.message);
    } finally {
      // setLoading(false);
    }
  };

  const getBorderColor = (fieldName) => {
    if (errors[fieldName]) return 'border-red-500';
    if (formData[fieldName] && !errors[fieldName]) return 'border-green-500';
    return 'border-gray-300';
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Vehicle Exit</h2>
      <form className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          <TextInput
            label="Vehicle Registration Number"
            type="text"
            name="vehicleNo"
            value={formData.vehicleNo}
            onChange={handleChange}
            placeholder="Enter vehicle registration number"
            required
            borderColor={getBorderColor('vehicleNo')}
          />
          {errors.vehicleNo && <p className="text-red-500 mt-1 text-xs font-semibold pl-2">{errors.vehicleNo}</p>}
        </div>

        <CustomBtn
          // text={loading ? "Processing..." : (checked ? "Exit" : "Check")}
          text={"exit"}
          type="button"
          textcolor="white"
          // onClick={checked ? handleSubmit : handleCheck}
          onClick={handleSubmit}
          // disabled={loading}
        />
      </form>
    </div>
  );
};

export default MakeExit;
