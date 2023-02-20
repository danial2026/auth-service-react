import React, { useState , useEffect } from "react";

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
  submitButton: {
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
    backgroundColor: "transparent",
    color: "#00AB66",
    fontSize: 16,
    border: "none",
    cursor: "pointer",
    marginTop: 20
  }
};

const VerificationPage = () => {
  const [username, setUsername] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [resuestError, setResuestError] = useState("");

  useEffect(() => {
    // Get the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const usernameParam = urlParams.get("username");

    if (usernameParam) {
      setUsername(usernameParam)
    } else {
      // Redirect to main page if user is not logged in
      window.location.href = "/";
    }
  }, []);
  
  const handleVerificationCodeSubmit = (event) => {
    event.preventDefault();
    
    // Send POST request to verify API endpoint
    fetch('https://authapi.danials.space/api/v1/users/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        code: verificationCode
      })
    })
    .then(response => {
      // Handle response from API
      if (response.ok) {
        // Signup successful, redirect to verfication page
        window.location.href = `/`;
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
        <h2 style={styles.formTitle}>
          Verification
        </h2>
        <input
          style={styles.input}
          type="number"
          value={verificationCode}
          onChange={e => setVerificationCode(e.target.value)}
          placeholder="Code"
        />
        <h3> ✨ use this for demo: `123456`</h3>
        <div style={{ margin: 10 }}>
          <button style={styles.submitButton} onClick={handleVerificationCodeSubmit}>
            Verify
          </button>
        </div>
        {resuestError ? (
          <h1 style={styles.resuestErrorMessage}>{resuestError}</h1>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
