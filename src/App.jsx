import React, { useEffect, useState } from 'react';
import WeatherPanel from './components/weatherPanel/weatherPanel';
import ProfilePanel from './components/profilePanel/profilePanel';
import useIsMobile from './utils/useIsMobile';
import useLocalStorage from './utils/useLocalStorage';
import { useAuth0 } from '@auth0/auth0-react';

import './App.css';

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const { isMobile } = useIsMobile();
  const [favouriteToShow, setFavouriteToShow] = useState(null);
  const [showProfilePanel, setShowProfilePanel] = useState(true);
  const [database, setDatabase] = useLocalStorage('users', []);
  const [favLocations, setFavLocations] = useState([]);

  useEffect(() => {
    setShowProfilePanel(isMobile ? false : true);
  }, [isMobile]);

  useEffect(() => {
    if (isAuthenticated) {
      const currentUser = database.find((data) => data?.userid === user.sub);

      if (!currentUser) {
        setDatabase((curr) => [...curr, { userid: user.sub, data: [] }]);
      } else {
        setFavLocations(currentUser.data);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const otherUsers = database.filter((data) => data?.userid !== user.sub);

      setDatabase([
        ...otherUsers,
        { userid: user.sub, data: [...favLocations] },
      ]);
    }
  }, [favLocations]);

  return (
    <div className="app">
      <div className="app__container">
        <WeatherPanel
          favLocations={favLocations}
          setFavLocations={setFavLocations}
          favouriteToShow={favouriteToShow}
          setShowProfilePanel={setShowProfilePanel}
        />
        <ProfilePanel
          favLocations={favLocations}
          setFavouriteToShow={setFavouriteToShow}
          setShowProfilePanel={setShowProfilePanel}
          showProfilePanel={showProfilePanel}
        />
      </div>
    </div>
  );
};

export default App;
