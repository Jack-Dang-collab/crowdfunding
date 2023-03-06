// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    // Think struct as an object in javascript
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    // Return the index of the most recent campaign
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        // block.timestamp is a special variable that represents the current block's timestamp. This value is set by the miner who includes the block in the blockchain, and it reflects the current time at which the block was mined.
        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        // This line of code is calling the "payable" function of the contract associated with the "campaign.owner" address, with an input value of "amount". The function takes no arguments, indicated by the empty parentheses, and is called with the "call" function. The "call" function is used to execute a function of another contract, and returns a tuple with two elements: a boolean value "sent" which indicates whether the call was successful, and a second element which is not given a name and thus is not accessible. The function call is made in the context of the calling contract and the call is executed in the same transaction as the calling contract.
        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[]  memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        // This line of code is creating an array called "allCampaigns" in memory, which will be used to store instances of the "Campaign" struct. The size of the array is determined by the "numberOfCampaigns" variable, which should be an unsigned integer (uint) that represents the number of elements in the array. The type of the array is indicated by the "[]" brackets after the "Campaign" type, and the "memory" keyword specifies that the array should be stored in memory and not in storage.
        // [{}, {}, {}, ...]
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        // Populate allCampaigns
        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}