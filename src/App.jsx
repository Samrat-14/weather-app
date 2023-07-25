import React, { useEffect, useState } from 'react';
import WeatherPanel from './components/weatherPanel/weatherPanel';
import ProfilePanel from './components/profilePanel/profilePanel';
import useIsMobile from './utils/useIsMobile';

import './App.css';

const App = () => {
  const { isMobile } = useIsMobile();
  const [favLocations, setFavLocations] = useState([]);
  const [favouriteToShow, setFavouriteToShow] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(true);

  useEffect(() => {
    setShowProfilePanel(isMobile ? false : true);
  }, [isMobile]);

  return (
    <div className="app">
      <div className="app__container">
        <WeatherPanel
          favLocations={favLocations}
          setFavLocations={setFavLocations}
          favouriteToShow={favouriteToShow}
          isAuth={isAuth}
          setShowProfilePanel={setShowProfilePanel}
        />
        <ProfilePanel
          favLocations={favLocations}
          setFavouriteToShow={setFavouriteToShow}
          setIsAuth={setIsAuth}
          setShowProfilePanel={setShowProfilePanel}
          showProfilePanel={showProfilePanel}
        />
      </div>
    </div>
  );
};

export default App;
