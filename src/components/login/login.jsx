import React from 'react';

import './login.css';

const Login = ({ isAuthenticated, loginWithRedirect, logout, user }) => {
  return (
    <div className="profile">
      {!isAuthenticated ? (
        <button className="btn" onClick={() => loginWithRedirect()}>
          Login
        </button>
      ) : (
        <button
          className="btn"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </button>
      )}
      {isAuthenticated && (
        <img className="profile-pic" src={user.picture} alt="profile-pic" />
      )}
    </div>
  );
};

export default Login;
