"use client";
import CreateLeave from '@/app/servercoponent/createLeave';
// src/components/Popup.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface Popup {
  isOpen: () => void;
  onClose: () => void;
  setItems: () => any;
}

interface FormData {
  start_date: string;
  end_date: string;
  reason: string;
}

const AddPartnersPopup: React.FC<Popup> = ({ isOpen, onClose, setItems }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const submitData = async (setItemsdata: FormData) => {
    // Convert the date fields to the correct ISO format
    const formattedData = {
      ...setItemsdata,
      start_date: new Date(setItemsdata.start_date).toISOString(),
      end_date: new Date(setItemsdata.end_date).toISOString(),
    };

    console.log("Formatted form data:", formattedData);
    try {
    //   const response: any = await postRequest("/partner", formattedData);
    const response:any = await CreateLeave(formattedData)
      console.log("response data is here", response.data);
      if (response.status === "error") {
        toast.error(response.message, { position: 'top-center' });
      } else {
        toast.success(response.message, { position: 'top-center' });
        setTimeout(() => {
          onClose();
        }, 5000);
      }
    } catch (error) {
      console.log("error found", error);
      toast.error("An error occurred. Please try again.", { position: 'top-center' });
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    submitData(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute text-4xl top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Create Leave</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">
              Start Date
              <input
                type="date"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                {...register('start_date', { required: 'Start Date is required' })}
              />
            </label>
            {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">
              End Date
              <input
                type="date"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                {...register('end_date', { required: 'End Date is required' })}
              />
            </label>
            {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">
              Reason
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                {...register('reason', { required: 'Reason is required' })}
              />
            </label>
            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddPartnersPopup;
