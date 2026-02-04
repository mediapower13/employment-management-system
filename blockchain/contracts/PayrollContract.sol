// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PayrollContract {
    
    struct Payment {
        uint256 amount;
        uint256 timestamp;
        string month;
        uint256 year;
        bool processed;
    }
    
    mapping(address => Payment[]) public paymentHistory;
    mapping(address => uint256) public totalPaid;
    
    address public owner;
    
    event PaymentProcessed(
        address indexed employee,
        uint256 amount,
        string month,
        uint256 year,
        uint256 timestamp
    );
    
    event FundsDeposited(address indexed sender, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    receive() external payable {
        emit FundsDeposited(msg.sender, msg.value);
    }
    
    function processPayment(
        address payable _employee,
        uint256 _amount,
        string memory _month,
        uint256 _year
    ) public onlyOwner {
        require(_employee != address(0), "Invalid employee address");
        require(_amount > 0, "Amount must be greater than 0");
        require(address(this).balance >= _amount, "Insufficient contract balance");
        
        paymentHistory[_employee].push(Payment({
            amount: _amount,
            timestamp: block.timestamp,
            month: _month,
            year: _year,
            processed: true
        }));
        
        totalPaid[_employee] += _amount;
        
        (bool success, ) = _employee.call{value: _amount}("");
        require(success, "Payment transfer failed");
        
        emit PaymentProcessed(_employee, _amount, _month, _year, block.timestamp);
    }
    
    function batchProcessPayments(
        address payable[] memory _employees,
        uint256[] memory _amounts,
        string memory _month,
        uint256 _year
    ) public onlyOwner {
        require(_employees.length == _amounts.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < _employees.length; i++) {
            processPayment(_employees[i], _amounts[i], _month, _year);
        }
    }
    
    function getPaymentHistory(address _employee) 
        public 
        view 
        returns (Payment[] memory) 
    {
        return paymentHistory[_employee];
    }
    
    function getPaymentCount(address _employee) 
        public 
        view 
        returns (uint256) 
    {
        return paymentHistory[_employee].length;
    }
    
    function getTotalPaid(address _employee) 
        public 
        view 
        returns (uint256) 
    {
        return totalPaid[_employee];
    }
    
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    function withdrawFunds(uint256 _amount) public onlyOwner {
        require(_amount <= address(this).balance, "Insufficient balance");
        payable(owner).transfer(_amount);
    }
}
