import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1>Google Sign In</h1>
        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
            marginLeft: "44rem",
          }}
        >
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </>
  );
};

export default Signin;
