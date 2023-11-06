import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Heading2 from "../../components/typography/heading-2/Heading2";
import "./Login.scss";
import FormInput from "../../components/form-input/FormInput";
import PrimaryButton from "../../components/primary-button/PrimaryButton";
import { userSignIn } from "./service/Login";
import {
  LocalStorageKeys,
  addToStorage,
  getFromStorage,
} from "../../../utils/localStorage";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

const Login = () => {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getFromStorage(LocalStorageKeys.USER) ? navigate("/complaints") : null;
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!user_name.trim() || !password.trim()) {
        setError(true);
      } else {
        setError(false);
        await userSignIn({ user_name, password }).then((response) => {
          if (response.data.status.success) {
            addToStorage(LocalStorageKeys.USER, response.data.data);
            setErrorMessage("");
            navigate("/complaints");
          }
        });
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {getFromStorage(LocalStorageKeys.USER) && <Header />}
      <div
        className={`${
          getFromStorage(LocalStorageKeys.USER) &&
          Object.entries(getFromStorage(LocalStorageKeys.USER)).length != 0
            ? "child-container-loggedIn"
            : "child-container-loggedOut"
        }`}
      >
        {getFromStorage(LocalStorageKeys.USER) && <Navbar />}
        <div
          className={`${
            getFromStorage(LocalStorageKeys.USER) &&
            Object.entries(getFromStorage(LocalStorageKeys.USER)).length != 0
              ? "left-container"
              : "login-signup-container"
          }`}
        >
          <div className="login-wrapper">
            <div className="login-header">
              <img
                className="logo"
                src="../../../assets/AEG-pakistan.png"
                alt="logo"
              />
              <Heading2 text="Login" />
            </div>
            <div className="login-form">
              <FormInput
                type="text"
                label="Username"
                value={user_name}
                name="username"
                error={error}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Please enter username"
              />
              <FormInput
                type="password"
                label="Password"
                value={password}
                name="password"
                error={error}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please enter password"
              />
              {errorMessage.length != 0 ? (
                <p className="error-message">{errorMessage}</p>
              ) : (
                <p className="error-message"></p>
              )}
            </div>
            <div className="login-footer">
              <PrimaryButton
                text="Login"
                onClick={handleSubmit}
                className="modal-primary"
              />
              {/* <p className="signup-text">
                Don't have an account?{" "}
                <span
                  className="signup-link"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </span>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
