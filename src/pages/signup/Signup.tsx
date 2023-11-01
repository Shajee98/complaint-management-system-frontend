import { useState, FormEvent, useEffect } from "react";
import FormInput from "../../components/form-input/FormInput";
import Heading2 from "../../components/typography/heading-2/Heading2";
import PrimaryButton from "../../components/primary-button/PrimaryButton";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
import { LocalStorageKeys, getFromStorage } from "../../../utils/localStorage";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { getAllDepartments, getUserTypes, userSignUp } from "./service/Signup";
import DropDown from "../../components/drop-down/DropDown";
import { FormSelectStyle } from "../../components/drop-down/ReactSelectStyles";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [departments, setDepartments] = useState<
    { id: number; value: string; label: string }[]
  >([]);
  const [userTypes, setUserTypes] = useState<
    { id: number; value: string; label: string }[]
  >([]);
  const [selectedDept, setSelectedDept] = useState<any>();
  const [selectedUserType, setSelectedUserType] = useState<any>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
    fetchUserTyes();
    getFromStorage(LocalStorageKeys.USER) ? navigate("/complaints") : null;
  }, []);

  const fetchDepartments = async () => {
    const response = await getAllDepartments();
    const deptCopy = response.data.data.departments.map((department: any) => {
      return {
        id: department.id,
        value: department.name,
        label: department.name.toUpperCase(),
      };
    });
    console.log("deptCopy ==> ", deptCopy);
    setDepartments([...deptCopy]);
    setSelectedDept(deptCopy[0]);
    console.log("departments ==> ", departments);
    return deptCopy;
  };

  const fetchUserTyes = async () => {
    const response = await getUserTypes();
    const userTypeCopy = response.data.data.userTypes.map((userType: any) => {
      return {
        id: userType.id,
        value: userType.name,
        label: userType.name.toUpperCase(),
      };
    });
    console.log("deptCopy ==> ", userTypeCopy);
    setUserTypes([...userTypeCopy]);
    setSelectedUserType(userTypeCopy[0]);
    console.log("departments ==> ", userTypes);
    return userTypeCopy;
  };

  const handleDepartmentChange = (option: any) => {
    console.log("selectedDept ===> ", option);
    setSelectedDept(option);
  };

  const handleUserTypeChange = (option: any) => {
    console.log("selectedDept ===> ", option);
    setSelectedUserType(option);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !username.trim() ||
        !password.trim()
      ) {
        console.log("Hello pliss signup 2");
        setError(true);
        return;
      } else {
        setError(false);
        
        await userSignUp({
          first_name: firstName,
          last_name: lastName,
          user_name: username,
          password,
          user_type_id: selectedUserType.id,
          department_id: selectedDept.id,
        }).then((response) => {
          if (response.data.status.success) {
            setErrorMessage("");
            navigate("/login");
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
          <div className="signup-wrapper">
            <div className="signup-header">
              <img
                className="logo"
                src="../../../assets/AEG-pakistan.png"
                alt="logo"
              />
              <Heading2 text="Signup" />
            </div>
            <div className="signup-form">
              <FormInput
                type="text"
                label="Firstname"
                value={firstName}
                name="firstName"
                error={error}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Please enter username"
              />
              <FormInput
                type="text"
                label="Lastname"
                value={lastName}
                name="lastName"
                error={error}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Please enter username"
              />
              <FormInput
                type="text"
                label="Username"
                value={username}
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
              <DropDown
                label="Department"
                styles={FormSelectStyle}
                options={departments}
                onChange={handleDepartmentChange}
                defaultValue={selectedDept}
              />
              <DropDown
                label="User Type"
                styles={FormSelectStyle}
                options={userTypes}
                onChange={handleUserTypeChange}
                defaultValue={selectedUserType}
              />
            </div>
            <div className="signup-footer">
              <PrimaryButton
                text="Signup"
                onClick={handleSubmit}
                className="modal-primary"
              />
              <p className="login-text">
                Already have an account?{" "}
                <span className="login-link" onClick={() => navigate("/login")}>
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
