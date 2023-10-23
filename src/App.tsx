import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Complaints from "./pages/complaints/Complaints";
import Settings from "./pages/settings/Settings";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import UserProvider from "../context/UserProvider";

function App() {
  return (
    <UserProvider>
      <div className="parent-container">
        <Router>
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
                Object.entries(getFromStorage(LocalStorageKeys.USER)).length !=
                  0
                  ? "left-container"
                  : "login-signup-container"
              }`}
            > */}
              <Routes>
                <Route element={<ProtectedRoute redirectPath="/login" />}>
                  <Route path="/" element={<Navigate to="/complaints"/>}/>
                  <Route path="/complaints" element={<Complaints />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            {/* </div> */}
          {/* </div> */}
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
