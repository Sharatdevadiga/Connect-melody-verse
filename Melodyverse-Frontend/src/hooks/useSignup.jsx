import { useState } from "react";
import { signup } from "../utils/api";
import { useNavigate } from "react-router-dom";

const useSignUp = function () {
  const [signupStatus, setSignupStatus] = useState(undefined);
  const [signupMessage, setSignupMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async function (values, resetFields) {
    try {
      const data = await signup(values.username, values.email, values.password);

      if (data?.status === "success") {
        setSignupStatus("success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setSignupStatus("fail");
      }

      setSignupMessage(data?.message);
    } catch (err) {
      console.error(err);
      setSignupStatus("fail");
      setSignupMessage("Signup failed. Please try again.");
    }

    resetFields();
  };

  return { signupStatus, signupMessage, handleSignup };
};

export default useSignUp;
