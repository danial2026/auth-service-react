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

function ProfileCard({username, fullName, bio}) {
  return (
    <div>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={{ display: 'flex' }}>
            <h3 style={styles.cardTitle}>Full Name :</h3>
            <h3 style={styles.cardTitle}>{fullName}</h3>
          </div>
        </div>
        <div style={styles.cardBody}>
          <div style={{ display: 'flex' }}>
            <p style={styles.cardBody}>Username :</p>
            <p style={styles.cardBody}>{username}</p>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={styles.cardBody}>Bio:</p>
            <p style={styles.cardBody}>{bio}</p>
          </div>
        </div>
      </div>
      {/* <button style={styles.logoutButton} onClick={() => window.location.href = '/login'}>Logout</button> */}
    </div>
  );
}

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async (accessToken) => {
      try {
        const response = await fetch('https://authapi.danials.space/api/v1/users/me/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetchData(accessToken);
    }    
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {profileData && <ProfileCard username={profileData.username} fullName={profileData.fullName} bio={profileData.bio} />}
        {!profileData ? (
        <div>
          <button style={styles.signupButton} onClick={() => window.location.href = '/signup'}>Sign Up</button>
          <div style={{marginBottom: '20px'}}/>
          <button style={styles.loginButton} onClick={() => window.location.href = '/login'}>Login</button>
        </div>
        ) : (<></>)}
      </div>
    </div>
  );
}

export default ProfilePage;
