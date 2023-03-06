import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ThemeContext } from './context/themeContext';
import { SearchContext } from './context/searchContext';
import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages'; 

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { search, getSearch } = useContext(SearchContext);

  return (
    <div className={`relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row ${theme}-mode`}>
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar theme={theme} toggleTheme={toggleTheme}/>
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar theme={theme} toggleTheme={toggleTheme} setSearch={getSearch} />
        
        <Routes>
          <Route path="/" element={<Home theme={theme} keySearch={search}/>} />
          <Route path="/profile" element={<Profile theme={theme} keySearch={search} />} />
          <Route path="/create-campaign" element={<CreateCampaign theme={theme} />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails theme={theme} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;