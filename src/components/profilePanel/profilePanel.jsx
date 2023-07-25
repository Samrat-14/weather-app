import React, { useEffect, useState } from 'react';
import FavouriteLocations from '../favouriteLocations/favouriteLocations.jsx';
import Login from '../login/login.jsx';
import { useAuth0 } from '@auth0/auth0-react';

import './profilePanel.css';

const ProfilePanel = ({
  favLocations,
  setFavouriteToShow,
  setIsAuth,
  setShowProfilePanel,
  showProfilePanel,
}) => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const [theme, setTheme] = useState('dark-theme');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    setIsAuth(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div
      className={`profile-panel container ${showProfilePanel ? 'show' : ''}`}
    >
      <div className="profile-panel__auth">
        <div className="profile-panel__auth-info flex-row align-center">
          <div className="toggle-wrapper">
            <input
              type="checkbox"
              name="mode-toggle"
              id="mode-toggle"
              className="toggle mode-toggle"
              onChange={() =>
                setTheme((curr) =>
                  curr === 'dark-theme' ? 'light-theme' : 'dark-theme'
                )
              }
            />
            <label htmlFor="mode-toggle"></label>
          </div>
          <Login
            isAuthenticated={isAuthenticated}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
            user={user}
          />
        </div>

        <div className="flex-row align-center">
          <h4 className="greetings font">{`Good ${
            new Date().getHours() > 4 && new Date().getHours() < 12
              ? 'morning'
              : new Date().getHours() >= 12 && new Date().getHours() < 16
              ? 'afternoon'
              : new Date().getHours() >= 16 && new Date().getHours() < 22
              ? 'evening'
              : 'night'
          }`}</h4>
          &nbsp;
          {isAuthenticated && (
            <h3 className="profile-name font">{user.nickname}</h3>
          )}
        </div>
      </div>

      {isAuthenticated ? (
        <FavouriteLocations
          favLocations={favLocations}
          setFavouriteToShow={setFavouriteToShow}
          setShowProfilePanel={setShowProfilePanel}
        />
      ) : (
        <div style={{ marginTop: '50px' }}>
          <div className="no-data-to-display">
            <p>Please login to favourite a location!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePanel;
