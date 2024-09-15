import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/textinput";
import CustomBtn from "../components/CustomBtn";
import { toast } from "react-toastify";
import { addParking } from '../services/addParkingService';

const AddParkingArea = () => {
  const [parkingData, setParkingData] = useState({
    operatorId: "",
    title: "",
    costingType: "",
    description: "",
    cost2wheeler: "",
    cost4wheeler: "",
    latitude: "",
    longitude: "",
    availability: true,
    capacity2wheeler: "",
    capacity4wheeler: "",
    address: "",
    pinCode: ""
  });

  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) {
        navigate("/");
        return;
      } else {
        setCurrentUser(currentUser);
      }
    };
    fetchUser();
  }, [navigate]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value) error = "Title is required";
        break;
      case "description":
        if (!value) error = "Description is required";
        break;
      case "cost2wheeler":
      case "cost4wheeler":
        if (value < 0) error = "Cost must be a non-negative number";
        break;
      case "latitude":
        const latitudeRegex = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
        if (!latitudeRegex.test(value)) error = "Invalid latitude value";
        break;
      case "longitude":
        const longitudeRegex = /^-?(180(\.0+)?|(1[0-7]\d|\d{1,2})(\.\d+)?)$/;
        if (!longitudeRegex.test(value)) error = "Invalid longitude value";
        break;
      case "capacity2wheeler":
      case "capacity4wheeler":
        if (value < 0) error = "Capacity must be a non-negative number";
        break;
      case "address":
        if (!value) error = "Address is required";
        break;
      case "pinCode":
        const pinCodeRegex = /^[1-9][0-9]{5}$/;
        if (!pinCodeRegex.test(value)) error = "Invalid Pin Code";
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (["cost2wheeler", "cost4wheeler", "capacity2wheeler", "capacity4wheeler"].includes(name)) {
      if (value < 0) return; 
    }

    setParkingData({
      ...parkingData,
      [name]: type === 'checkbox' ? checked : value
    });

    validateField(name, value);
  };

  const validateForm = () => {
    let tempErrors = {};
    Object.keys(parkingData).forEach(key => {
      validateField(key, parkingData[key]);
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("in try of addbooking");
      parkingData.opId = currentUser.id;
      await addParking(parkingData);
      toast.success("Parking Added Successfully");
      navigate("/operatordashboard");
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  const getBorderColor = (fieldName) => {
    if (errors[fieldName]) return 'border-red-500';
    if (parkingData[fieldName] && !errors[fieldName]) return 'border-green-500';
    return 'border-gray-300';
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Parking</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-5">
        <div className="flex gap-10">
          <div className="mb-4 w-1/2">
            <TextInput
              type="text"
              label="Title"
              placeholder="Enter parking area title"
              required
              value={parkingData.title}
              name="title"
              onChange={handleChange}
              borderColor={getBorderColor('title')}
              error={errors.title}
            />
            {errors.title && <p className="text-red-500 mt-1 text-xs font-semibold pl-2">{errors.title}</p>}
          </div>
          <div className="mb-4 w-1/2 flex justify-center items-center">
            <div>
              <label className="block mb-2 font-semibold">Costing Type</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="fixed"
                  name="costingType"
                  value="fixed"
                  checked={parkingData.costingType === 'fixed'}
                  onChange={handleChange}
                  className={`mr-2 ${getBorderColor('costingType')}`}
                />
                <label htmlFor="fixed" className="mr-4">Fixed</label>
                <input
                  type="radio"
                  id="hourly"
                  name="costingType"
                  value="hourly"
                  checked={parkingData.costingType === 'hourly'}
                  onChange={handleChange}
                  className={`mr-2 ${getBorderColor('costingType')}`}
                />
                <label htmlFor="hourly">Hourly</label>
              </div>
            </div>
          </div>
        </div>
        <div className="">
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              value={parkingData.description}
              onChange={handleChange}
              className={`p-2 border rounded w-full ${getBorderColor('description')}`}
              required
            ></textarea>
            {errors.description && <p className="text-red-500 mt-1 text-xs font-semibold pl-2">{errors.description}</p>}
          
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <TextInput
              type="number"
              label="Cost for 2 Wheeler"
              placeholder="Enter cost for 2 wheeler"
              required
              value={parkingData.cost2wheeler}
              name="cost2wheeler"
              min="0"
              onChange={handleChange}
              borderColor={getBorderColor('cost2wheeler')}
              error={errors.cost2wheeler}
            />
            {errors.cost2wheeler && <p className="text-red-500 mt-1 text-xs font-semibold pl-2">{errors.cost2wheeler}</p>}
          </div>
          <div>
            <TextInput
              type="number"
              label="Cost for 4 Wheeler"
              placeholder="Enter cost for 4 wheeler"
              required
              value={parkingData.cost4wheeler}
              name="cost4wheeler"
              min="0"
              onChange={handleChange}
              borderColor={getBorderColor('cost4wheeler')}
              error={errors.cost4wheeler}
            />
            {errors.cost4wheeler && <p className="text-red-500 mt-1 text-xs font-semibold pl-2">{errors.cost4wheeler}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <TextInput
              type="text"
              label="Latitude"
              placeholder="Enter latitude (e.g., 37.7749)"
              required
              value={parkingData.latitude}
              name="latitude"
              pattern="^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$"
              onChange={handleChange}
              borderColor={getBorderColor('latitude')}
              error={errors.latitude}
            />
            {errors.latitude && <p className="text-red-500 mt-1 text-xs font-semibold pl-2">{errors.latitude}</p>}
          </div>
          <div>
            <TextInput
              type="text"
              label="Longitude"
              placeholder="Enter longitude (e.g., -122.4194)"
              required
              value={parkingData.longitude}
              name="longitude"
              pattern="^-?(180(\.0+)?|(1[0-7]\d|\d{1,2})(\.\d+)?)$"
              onChange={handleChange}
              borderColor={getBorderColor('longitude')}
              error={errors.longitude}
            />
            {errors.longitude && <p className="text-red-500 mt-1 text-xs font-semibold pl-2">{errors.longitude}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <TextInput
              type="number"
              label="Capacity for 2 Wheeler"
              placeholder="Enter capacity for 2 wheeler"
              required
              value={parkingData.capacity2wheeler}
              name="capacity2wheeler"
              min="0"
              onChange={handleChange}
              borderColor={getBorderColor('capacity2wheeler')}
              error={errors.capacity2wheeler}
            />
            {errors.capacity2wheeler && <p className="text-red-500 mt-1 text-xs font-semibold pl-2">{errors.capacity2wheeler}</p>}
          </div>
          <div>
            <TextInput
              type="number"
              label="Capacity for 4 Wheeler"
              placeholder="Enter capacity for 4 wheeler"
              required
              value={parkingData.capacity4wheeler}
              name="capacity4wheeler"
              min="0"
              onChange={handleChange}
              borderColor={getBorderColor('capacity4wheeler')}
              error={errors.capacity4wheeler}
            />
            {errors.capacity4wheeler && <p className="text-red-500 mt-1 text-xs font-semibold pl-2">{errors.capacity4wheeler}</p>}
          </div>
        </div>
        <div>
          <TextInput
            type="text"
            label="Address"
            placeholder="Enter address"
            required
            value={parkingData.address}
            name="address"
            onChange={handleChange}
            borderColor={getBorderColor('address')}
            error={errors.address}
          />
          {errors.address && <p className="text-red-500 mt-1 text-xs font-semibold pl-2">{errors.address}</p>}
          </div>
        <div>
          <TextInput
            type="text"
            label="Pin Code"
            placeholder="Enter Pin Code"
            required
            value={parkingData.pinCode}
            name="pinCode"
            pattern="^[1-9][0-9]{5}$"
            onChange={handleChange}
            borderColor={getBorderColor('pinCode')}
            error={errors.pinCode}
          />
          {errors.pinCode && <p className="text-red-500 mt-1 text-xs font-semibold pl-2">{errors.pinCode}</p>}
        </div>
        
        <CustomBtn type="submit" text="Add Parking" textcolor="white"/>
      </form>
    </div>
  );
};

export default AddParkingArea;
