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
  const [displayMessage, setdm] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchDepartments();
    fetchUserTyes();
    // getFromStorage(LocalStorageKeys.USER) ? navigate("/complaints") : null;
  }, []);

  const fetchDepartments = async () => {
    const response = await getAllDepartments();
    const user = getFromStorage(LocalStorageKeys.USER)
    let deptCopy = response.data.data.departments.map((department: any) => {
      return {
        id: department.id,
        value: department.name,
        label: department.name.toUpperCase(),
      };
    });
    if (user.user.user_type_id == 1)
    {
      const dept = deptCopy.filter((dept: any) => dept.id == user.user.department.id)
      console.log("dept ===> ", dept[0])
      setSelectedDept(dept[0])
    }
    else
    {
      setSelectedDept(deptCopy[0]);
    }
    console.log("deptCopy ==> ", deptCopy);
    setDepartments([...deptCopy]);
    console.log("departments ==> ", departments);
    return deptCopy;
  };

  const fetchUserTyes = async () => {
    const response = await getUserTypes();
    const user = getFromStorage(LocalStorageKeys.USER)
    let userTypeCopy = response.data.data.userTypes.map((userType: any) => {
      return {
        id: userType.id,
        value: userType.name,
        label: userType.name.toUpperCase(),
      };
    });
    if (user.user.user_type_id == 2)
    {
      userTypeCopy = userTypeCopy.filter((user_type: any) => user_type.id != 2)
      console.log("user types ===> ", userTypeCopy[0])
      setSelectedUserType(userTypeCopy[0]);
    }
    if (user.user.user_type_id == 1)
    {
      userTypeCopy = userTypeCopy.filter((user_type: any) => user_type.id == 3)
      console.log("user types ===> ", userTypeCopy[0])
      setSelectedUserType(userTypeCopy[0]); 
    }
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
            setdm("* User has been registered successfully!");
            setFirstName("");
            setLastName("");
            setUsername("");
            setPassword("");
            setTimeout(() => {
              setdm("")
            }, 5000);
            setErrorMessage("");
            // navigate("/login");
          }
        });
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {/* {getFromStorage(LocalStorageKeys.USER) && <Header />}
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
        > */}
          <div className="card-container">
            <div className="signup-header">
              <Heading2 text="Create User" />
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
              {selectedDept && <DropDown
                label="Department"
                value={selectedDept}
                styles={FormSelectStyle}
                options={departments}
                onChange={handleDepartmentChange}
                defaultValue={selectedDept}
                disabled={getFromStorage(LocalStorageKeys.USER).user.user_type_id == 1}
              />}
              {selectedUserType && <DropDown
                label="User Type"
                value={selectedUserType}
                styles={FormSelectStyle}
                options={userTypes}
                onChange={handleUserTypeChange}
                defaultValue={selectedUserType}
                disabled={getFromStorage(LocalStorageKeys.USER).user.user_type_id == 1}
              />}
            </div>
            <div className="signup-footer">
              <PrimaryButton
                text="Create"
                onClick={handleSubmit}
                className="modal-primary"
              />
              <p className="signup-message-text">{displayMessage}</p>
              
              {/* <p className="login-text">
                Already have an account?{" "}
                <span className="login-link" onClick={() => navigate("/login")}>
                  Login
                </span>
              </p> */}
            </div>
          </div>
        {/* </div>
      </div> */}
    </>
  );
};

export default Signup;
