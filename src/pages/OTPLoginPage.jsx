import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";
import OTPVerification from "../components/OTPVerification.jsx";


const OTPLoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOTPRequested, setIsOTPRequested] = useState(false);

  const requestOTP = async () => {
    if (!phoneNumber.trim()) return toast.error("Please enter phone number!");
    try {
      // Gửi yêu cầu OTP tới server
      await useAuthStore.getState().requestOTP({ phoneNumber });
      setIsOTPRequested(true);
      toast.success("OTP has been sent!");
    } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred.");
        console.error("Error during OTP verification:", error); // Log lỗi ra console
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {!isOTPRequested ? (
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p>Please enter your phone number to receive OTP code.</p>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className="btn btn-primary w-full" onClick={requestOTP}>
            Get OTP code
          </button>
        </div>
      ) : (
        <OTPVerification phoneNumber={phoneNumber} />
      )}
    </div>
  );
};

export default OTPLoginPage;
