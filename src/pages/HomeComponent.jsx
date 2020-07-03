import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

function HomeComponent() {
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("logged");
    history.push("/login");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <p>Welcome to Home</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}

export default HomeComponent;
