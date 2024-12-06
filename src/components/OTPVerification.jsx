import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";

const OTPVerification = ({ phoneNumber }) => {
  const [otp, setOTP] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitOTP = async () => {
    if (!otp.trim()) return toast.error("Please enter OTP!");
    setIsSubmitting(true);
    try {
      // Xác nhận OTP với server
      await useAuthStore.getState().verifyOTP({ phoneNumber, otp });
      toast.success("OTP confirmation successful!");
      // Điều hướng người dùng tới trang đặt lại mật khẩu
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred..");
      console.error("Error during OTP verification:", error); // Log lỗi ra console
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <h1 className="text-2xl font-bold">Enter OTP code</h1>
      <p>OTP code has been sent to phone number: {phoneNumber}</p>
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Enter OTP code"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
      />
      <button
        className="btn btn-primary w-full"
        onClick={submitOTP}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Confirm"}
      </button>
      <button className="btn btn-secondary w-full" onClick={() => setOTP("")}>
      Resend OTP code
      </button>
    </div>
  );
};

export default OTPVerification;
