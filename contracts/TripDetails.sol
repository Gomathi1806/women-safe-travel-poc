//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract TripDetails {
    struct TripDetail {
        string tripName;
        address user;
        string tripFrom;
        string tripTo;
        uint256 estimatedTimeToComplete;
    }

    TripDetail[] public tripDetails;
    mapping(address => TripDetail[]) public tripsByUser;

    constructor(
        string memory tripName,
        string memory tripFrom,
        string memory tripTo,
        uint256 estimatedTimeToComplete
    ) {
        tripDetails.push(
            TripDetail(
                tripName,
                msg.sender,
                tripFrom,
                tripTo,
                estimatedTimeToComplete
            )
        );
    }

    function setTripDetails(
        string memory tripName,
        string memory tripFrom,
        string memory tripTo,
        uint256 estimatedTimeToComplete
    ) public {
        tripDetails.push(
            TripDetail(
                tripName,
                msg.sender,
                tripFrom,
                tripTo,
                estimatedTimeToComplete
            )
        );
    }

    function getTripDetails() public view returns (TripDetail memory) {
        return tripDetails[0];
    }
}
