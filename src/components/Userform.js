import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Radio } from "@material-ui/core";
import Showerror from "../components/Showerror";
//import validator from 'validator';

const Userform = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const propsData = location.state?.user;
  console.log({ propsData });

  const [id, setId] = useState(propsData?._id ? propsData._id : "");
  const [Firstname, setFirstname] = useState(
    propsData?.Firstname ? propsData.Firstname : ""
  );
  const [Lastname, setLastname] = useState(
    propsData?.Lastname ? propsData.Lastname : ""
  );
  const [Email, setEmail] = useState(propsData?.Email ? propsData.Email : "");
  const [Phoneno, setPhoneno] = useState(
    propsData?.Phoneno ? propsData.Phoneno : ""
  );
  const [Password, setPassword] = useState(
    propsData?.Password ? propsData.Password : ""
  );
  const [Gender, setGender] = useState(
    propsData?.Gender ? propsData.Gender : ""
  );
  const [Uploadimage, setUploadimage] = useState(
    propsData?.Uploadimage ? propsData.Uploadimage : ""
  );
  const [error, setError] = useState();
  const [isValid, setIsValid] = useState(false);
  const [isPasswordValid, setIsPassordValid] = useState(false);

  const [FirstnameError, setFirstnameError] = useState("");
  const [LastnameError, setLastnameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PhonenoError, setPhonenoError] = useState("");
  const [PasswordError, setPasswordError] = useState();
  const [GenderError, setGenderError] = useState("");
  // const [valida]

  const emailRegex = /\S+@\S+\.\S+/;

  const ValidateEmail = (e) => {
    const email = e.target.value;
    if (emailRegex.test(email)) {
      setIsValid(true);
      setEmailError("your email is good ");
    } else {
      setIsValid(false);
      setEmailError("your email is not good");
    }
    setEmail(email);
  };

  const ValidatePassword = (e) => {
    var password = e.target.value;
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    var pwd = reg.test(password);
    console.log("pwd", pwd);
    if (pwd) {
      setIsPassordValid(true);
      setPasswordError("your password is good");
    } else {
      setIsPassordValid(false);
      setPasswordError(
        "Please enter the password with one upper case and lower with specical symbol"
      );
    }
    setPassword(password);
  };
  //  setPassword(Password)

  const handleImageChange = (e) => {
    setUploadimage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();

    formdata.append("Firstname", Firstname);
    formdata.append("Lastname", Lastname);
    formdata.append("Email", Email);
    formdata.append("Password", Password);
    formdata.append("Phoneno", Phoneno);
    formdata.append("Gender", Gender);
    formdata.append("user_file", Uploadimage);

    let flag = false;
    if (Firstname === "") {
      setFirstnameError("Please enter the FirstName");
      flag = true;
    } else {
      setFirstnameError("");
    }

    if (Lastname === "") {
      setLastnameError("please enter the last name ");
      flag = true;
    } else {
      setLastnameError("");
    }

    if (Phoneno.length < 10 || Phoneno.length >= 12) {
      flag = true;
      setPhonenoError("minimum enter the 10 and maximum no  12");
    } else {
      setPhonenoError("");
    }

    if (!flag) {
      if (id) {
        //update api

        const user = {
          Firstname,
          Lastname,
          Email,
          Password,
          Phoneno,
          Gender,
          Uploadimage,
        };
        // console.log()
        const response = await fetch(`http://localhost:4000/api/user/${id}`, {
          method: "put",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });

        navigate("/userlist");
        console.log("edit succesgully", user);
      } else {
        console.log("user", formdata);
        if (!isValid) {
          setEmailError("please enter proper email");
          flag = false;
        } else {
          setEmailError("");
        }
        if (Password.length <= 5 || Password.length > 10) {
          setPasswordError("");
          flag = true;
        } else {
          setPasswordError("");
        }

        //add the new data crete
        const response = await fetch("http://localhost:4000/api/user/add", {
          method: "post",
          body: formdata,
          "Content-Type": "multipart/form-data",
        });
        const json = await response.json();
        if (!response.ok) {
          setError(json.error);
        }

        if (response.ok) {
          setFirstname("");
          setLastname("");
          setPassword("");
          setGender("");
          setEmail("");
          setPhoneno("");
          setUploadimage("");
          setError(null);
          // reset('')
          // setError(null)
          console.log("new user added ", json);
          navigate("/userlist");

          //Errormsg('')
        }
      }
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <label>Firstname</label>
      <input
        type="text"
        onChange={(e) => setFirstname(e.target.value)}
        value={Firstname}
      />
      {FirstnameError ? <Showerror msg={FirstnameError} /> : null}

      <label>Lastname</label>
      <input
        type="text"
        onChange={(e) => setLastname(e.target.value)}
        value={Lastname}
      />
      {LastnameError ? <Showerror msg={LastnameError} /> : null}

      <label>Email:-</label>

      <input
        type="text"
        value={Email}
        onChange={(e) => {
          ValidateEmail(e);
        }}
      />
      {console.log("EmailError ==>", { EmailError })}
      {EmailError ? (
        <div className={`EmailError ${isValid ? "success" : "error"}`}>
          <Showerror msg={EmailError} />

          {console.log("emailerror ", EmailError)}
        </div>
      ) : (
        ""
      )}
      {!id ? (
        <>
          <label>Password:-</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => {
              ValidatePassword(e);
            }}
          />
          {PasswordError ? (
            <div
              className={`PasswordError ${
                isPasswordValid ? "success" : "error"
              }`}
            >
              {PasswordError}
            </div>
          ) : (
            ""
          )}
        </>
      ) : null}

      <label>Phoneno</label>
      <input
        type="text"
        onChange={(e) => setPhoneno(e.target.value)}
        value={Phoneno}
      />
      {PhonenoError ? <Showerror msg={PhonenoError} /> : null}

      <div>
        <label>Male </label>
        <input
          type="radio"
          color="primary"
          value="Male"
          checked={Gender === "Male"}
          onClick={() => {
            setGender("Male");
          }}
        />
      </div>

      <div>
        <label>Female</label>
        <input
          type="radio"
          value="Female"
          checked={Gender === "Female"}
          onClick={() => {
            setGender("Female");
          }}
        />
      </div>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">SubmitUser</button>
    </form>
  );
};

export default Userform;
