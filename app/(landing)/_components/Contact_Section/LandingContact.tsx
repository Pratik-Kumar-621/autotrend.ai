"use client";
import React from "react";
import { useForm } from "@formspree/react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const LandingContact = () => {
  const [state, handleSubmit, reset] = useForm("mwpleooq");
  if (state.succeeded) {
    toast.success("Submitted Successfully! We will get in touch soon", {
      toastId: "submit-form",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    reset();
  }
  if (state.errors) {
    toast.error(
      `An error occurred while submitting the form. Please check the details and try again.`,
      {
        toastId: "error-form",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    reset();
  }

  return (
    <div
      className="landing-content landing-contact text-white"
      id="landing-contact"
    >
      <h2 className="text-3xl font-bold text-center mb-4">Send us a Message</h2>
      <p className="text-center text-lg mb-8 px-4">
        {"We'd"} love to hear from you! Please fill out the form below and{" "}
        {"we'll"} get in touch with you shortly.
      </p>
      <div className="flex justify-center ">
        <form
          onSubmit={handleSubmit}
          className="w-full p-8 rounded-lg shadow-md border bg-[#333333] border-[#1d1d1d]"
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-[#c2c2c2] text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none bg-[#e7e7e7] border rounded-lg w-full py-2 px-3 text-[#000000] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-[#c2c2c2] text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none bg-[#e7e7e7] border rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-[#c2c2c2] text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 min-h-[100px] bg-[#e7e7e7] text-black leading-tight focus:outline-none focus:shadow-outline"
              rows={5}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              variant="contained"
              className="landing-contact-button"
              disabled={state.submitting}
            >
              {state.submitting ? "Submitting..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingContact;
