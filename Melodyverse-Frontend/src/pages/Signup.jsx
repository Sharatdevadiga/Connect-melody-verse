import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import Logo from "../components/general/Logo";
import InputField from "../components/form/InputField";
import useSignUp from "../hooks/useSignup";

import {
  validateEmail,
  validatePassword,
  validateRepeatPassword,
  validateUserName,
} from "../utils/validators";

const SignupPage = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const validations = {
    username: validateUserName,
    email: validateEmail,
    password: validatePassword,
    repeatPassword: validateRepeatPassword,
  };

  // CUSTOM HOOKS
  const { signupStatus, signupMessage, handleSignup } = useSignUp();

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
    resetFields,
  } = useForm(initialValues, validations, () =>
    handleSignup(values, resetFields)
  );

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-12 p-6">
      <Logo />
      <form onSubmit={handleSubmit} className="form--auth">
        <h1 className="text-heading-l">Sign Up</h1>

        <InputField
          name="username"
          type="text"
          placeholder="User name"
          value={values.username}
          error={errors.username}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <InputField
          name="email"
          type="email"
          placeholder="Email address"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <InputField
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <InputField
          name="repeatPassword"
          type="password"
          placeholder="Repeat password"
          value={values.repeatPassword}
          error={errors.repeatPassword}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <p
          className={`text-center text-body-s ${
            signupStatus
              ? signupStatus === "success"
                ? "text-green-400 opacity-50"
                : signupStatus === "fail"
                ? "text-primary opacity-80"
                : "opacity-0"
              : "opacity-0"
          }`}
        >
          {signupMessage?.length ? signupMessage : "."}
        </p>

        <button type="submit" className="btn--cta" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create an account"}
        </button>

        <p className="text-center text-body-s">
          Already have an account?{" "}
          <Link className="text-primary" to="/login">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
};

export default SignupPage;
