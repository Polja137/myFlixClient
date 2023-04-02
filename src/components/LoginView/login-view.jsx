//import React from "react";
import { useState} from "react";


export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword]= useState("");
    
    //validation of user login
    const handleSubmit = (event) => {
        //this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

    const data={
        access:username,
        secret:password
    };

    fetch("https://radiant-woodland-98669.herokuapp.com/login", { 
      method: "POST",
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    });
    };

    //login form with submit button
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
           />
        </label>
        <label>
          Password:
          <input type="password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };

