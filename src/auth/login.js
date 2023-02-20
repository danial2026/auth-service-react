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
  resuestErrorMessage: {
    textAlign: 'center',
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
  loginButton: {
    width: "100%",
    padding: 10,
    backgroundColor: "#00AB66",
    color: "#FBFBFB",
    fontSize: 16,
    borderRadius: 5,
    border: "none",
    cursor: "pointer"
  },
  logoutButton: {
    width: "100%",
    padding: 10,
    backgroundColor: "#00AB66",
    color: "#FBFBFB",
    fontSize: 16,
    borderRadius: 5,
    border: "none",
    cursor: "pointer"
  },
  signupButton: {
    width: "100%",
    backgroundColor: "transparent",
    color: "#00AB66",
    fontSize: 16,
    border: "none",
    cursor: "pointer",
    marginTop: 20
  }
};

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [resuestError, setResuestError] = useState("");

  useEffect(() => {
    // Check if accessToken is present in local storage
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Send POST request to login API endpoint
    fetch('https://authapi.danials.space/api/v1/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => {
      // Handle response from API
      if (response.ok) {
        response.json().then(data => {
          // Save accessToken to local storage
          localStorage.setItem('accessToken', data.accessToken);
          setIsLoggedIn(true);
          // Login successful, redirect to home page or wherever you want to redirect
          window.location.href = "/";
        });
      } else {
        response.json().then(data => {
          setResuestError(data.message)
        });
        
        // Login failed, display error message
        console.log("Login failed");
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();

    // Remove accessToken from local storage
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    // Redirect to login page or wherever you want to redirect
    window.location.href = "/login";
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.formTitle}>Login</h1>
        {isLoggedIn ? (
          // Show logout button if logged in
          <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
        ) : (
          // Show login form if not logged in
          <form onSubmit={handleLogin}>
            <input
              style={styles.input}
              type="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button style={styles.loginButton}>Login</button>
          </form>
        )}
        {resuestError ? (
        <h1 style={styles.resuestErrorMessage}>{resuestError}</h1>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
