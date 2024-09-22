import Logo from "../components/general/Logo.jsx";
import useForm from "../hooks/useForm";
import InputField from "../components/form/InputField";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useState } from "react";
import { validateEmail, validateUserName } from "../utils/validators.js";

function LoginPage() {
  const [loginWith, setLoginWith] = useState("email");
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validations =
    loginWith === "email"
      ? { email: validateEmail }
      : { username: validateUserName };

  // CUSTOM HOOK
  const { loginStatus, loginMessage, handleLogin } = useLogin();

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
    handleLogin(values, loginWith, resetFields)
  );

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-12 p-6">
      <Logo />
      <form onSubmit={handleSubmit} className="form--auth">
        <div className="flex gap-2 items-center justify-center">
          <h2 className="text-heading-m">Login with</h2>
          <select
            name="loginWith"
            value={loginWith}
            onChange={(e) => setLoginWith(e.target.value)}
            className="text-heading-m border-b-[0.5px] border-slate-700 cursor-pointer bg-gray caret-primary outline-none placeholder:opacity-60"
          >
            <option value="email" className="text-sm">
              email
            </option>
            <option value="username" className="text-sm">
              name
            </option>
          </select>
        </div>

        {loginWith === "email" ? (
          <InputField
            name="email"
            type="email"
            placeholder="Email address"
            value={values.email || ""}
            error={errors.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-2/3 ml-4"
          />
        ) : (
          <InputField
            name="username"
            type="text"
            placeholder="Username"
            value={values.username || ""}
            error={errors.username}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-2/3 ml-4"
          />
        )}

        <InputField
          name="password"
          type="password"
          placeholder="Password"
          value={values.password || ""}
          error={errors.password}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <div className="flex gap-1 items-baseline justify-end opacity-80">
          <input type="checkbox" className="w-3 h-2.5"></input>
          <span>remember me</span>
        </div>

        <p
          className={`text-center text-body-s ${
            loginStatus
              ? loginStatus === "success"
                ? "text-green-400 opacity-50"
                : loginStatus === "fail"
                ? "text-red-500 opacity-80"
                : "opacity-0"
              : "opacity-0"
          }`}
        >
          {loginMessage?.length ? loginMessage : "."}
        </p>

        <button type="submit" className="btn--cta" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login to your account"}
        </button>

        <p className="text-center text-body-s">
          <Link className="text-primary" to="/forgotPassword">
            Forgot password
          </Link>{" "}
          / Don't have an account?{" "}
          <Link className="text-primary" to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
