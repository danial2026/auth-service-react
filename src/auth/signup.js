import React, { useState } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
  formContainer: {
    backgroundColor: "#1C1C1E",
    padding: 40,
    borderRadius: 10,
    boxShadow: "0px 0px 10px #000"
  },
  formTitle: {
    color: "#FBFBFB",
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 5,
    border: "none",
    backgroundColor: "#1C1C1E",
    color: "#FBFBFB"
  },
  signupButton: {
    width: "100%",
    padding: 10,
    backgroundColor: "#00AB66",
    color: "#FBFBFB",
    fontSize: 16,
    borderRadius: 5,
    border: "none",
    cursor: "pointer"
  },
  loginButton: {
    width: "100%",
    backgroundColor: "transparent",
    color: "#00AB66",
    fontSize: 16,
    border: "none",
    cursor: "pointer",
    marginTop: 20
  }
};

function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [resuestError, setResuestError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    // Send POST request to signup API endpoint
    fetch('https://authapi.danials.space/api/v1/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: fullName,
        username: username,
        phoneNumber: phoneNumber,
        password: password
      })
    })
    .then(response => {
      // Handle response from API
      if (response.ok) {
        // Signup successful, redirect to verfication page
        window.location.href = `/verification?username=${username}`;
      } else {
        response.json().then(data => {
          setResuestError(data.message)
        });
        
        // Signup failed, display error message
        console.log("Signup failed");
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.formTitle}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            style={styles.input}
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            style={styles.input}
            type="number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="PhoneNumber"
          />
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button style={styles.signupButton}>Sign Up</button>
          
        </form>
        <div style={{ margin: 10 }} />
        <button style={styles.loginButton} onClick={() => window.location.href = '/login'}>Login</button>
        {resuestError ? (
          <h1 style={styles.resuestErrorMessage}>{resuestError}</h1>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
