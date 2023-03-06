import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns, theme, searchTerm }) => {
  const userSearchCampaigns = [];
  for (let i = 0; i < campaigns.length; i++) {
    if (campaigns[i].title.toLowerCase().includes(searchTerm.toLowerCase())) {
      userSearchCampaigns.push(campaigns[i]);
    }
  }
  
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  if (userSearchCampaigns) {
    return (
      <div>
        <h1 className={`font-epilogue font-semibold text-[18px] text-left`}>{title} ({userSearchCampaigns.length})</h1>

        <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
              <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            )}

            {!isLoading && userSearchCampaigns.length === 0 && (
              <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                You have not created any campaigns yet.
              </p>
            )}

            {!isLoading && userSearchCampaigns.length > 0 && userSearchCampaigns.map((campaign) => <FundCard 
              key={campaign.id}
              theme={theme}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />)}
        </div>
    </div>
    )
  }

  return (
    <div>
        <h1 className={`font-epilogue font-semibold text-[18px] text-left`}>{title} ({campaigns.length})</h1>

        <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
              <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            )}

            {!isLoading && campaigns.length === 0 && (
              <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                You have not created any campaigns yet.
              </p>
            )}

            {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
              key={campaign.id}
              theme={theme}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />)}
        </div>
    </div>
  )
}

export default DisplayCampaigns;