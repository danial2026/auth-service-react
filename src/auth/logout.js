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
  loginButton: {
    width: "100%",
    padding: 10,
    backgroundColor: "#00AB66",
    color: "#FBFBFB",
    fontSize: 16,
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    minWidth: '150px',
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
  card: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px #000',
    overflow: 'hidden',
    width: '400px',
  },
  
  cardHeader: {
    padding: '20px',
    backgroundColor: '#00ab66',
  },
  
  cardTitle: {
    margin: '0 10px',
  },
  
  cardBody: {
    padding: '10px 10px 10px 20px',
  },
  
  p: {
    margin: '0',
  }
};

function LogoutPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logoutRequest = async (accessToken) => {
      try {
        const response = await fetch('https://authapi.danials.space/api/v1/users/logout', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setIsLoggedIn(true);

        // Remove accessToken from local storage
        localStorage.removeItem('accessToken');

        // Redirect to the main page
        window.location.href = "/";
      } catch (error) {
        console.error(error);
      }
    };

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      logoutRequest(accessToken);
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <button style={styles.loginButton} onClick={() => window.location.href = '/login'}>Login</button>
      </div>
    </div>
  );
}

export default LogoutPage;
