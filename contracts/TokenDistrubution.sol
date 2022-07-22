// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract PaymentSplitter {
    address payable[] public recipients;
    event TransferReceived(address _from, uint256 _amount);

    constructor(address payable[] memory _addrs) {
        for (uint256 i = 0; i < _addrs.length; i++) {
            recipients.push(_addrs[i]);
        }
    }

    receive() external payable {
        uint256 share = msg.value / recipients.length;

        for (uint256 i = 0; i < recipients.length; i++) {
            recipients[i].transfer(share);
        }
        emit TransferReceived(msg.sender, msg.value);
    }
}
