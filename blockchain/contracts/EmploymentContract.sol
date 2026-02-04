// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EmploymentContract {
    
    struct Employee {
        string name;
        string position;
        address walletAddress;
        bool isActive;
        uint256 joinDate;
        string department;
    }
    
    struct Credential {
        string credentialType;
        string issuer;
        uint256 issueDate;
        string ipfsHash;
        bool verified;
    }
    
    mapping(address => Employee) public employees;
    mapping(address => Credential[]) public credentials;
    mapping(address => bool) public isEmployee;
    
    address public owner;
    
    event EmployeeAdded(address indexed employeeAddress, string name, string position);
    event EmployeeUpdated(address indexed employeeAddress, string position);
    event EmployeeDeactivated(address indexed employeeAddress);
    event CredentialAdded(address indexed employeeAddress, string credentialType);
    event CredentialVerified(address indexed employeeAddress, uint256 credentialIndex);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier employeeExists(address _employee) {
        require(isEmployee[_employee], "Employee does not exist");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function addEmployee(
        address _employeeAddress,
        string memory _name,
        string memory _position,
        string memory _department
    ) public onlyOwner {
        require(!isEmployee[_employeeAddress], "Employee already exists");
        
        employees[_employeeAddress] = Employee({
            name: _name,
            position: _position,
            walletAddress: _employeeAddress,
            isActive: true,
            joinDate: block.timestamp,
            department: _department
        });
        
        isEmployee[_employeeAddress] = true;
        
        emit EmployeeAdded(_employeeAddress, _name, _position);
    }
    
    function updateEmployeePosition(
        address _employeeAddress,
        string memory _newPosition
    ) public onlyOwner employeeExists(_employeeAddress) {
        employees[_employeeAddress].position = _newPosition;
        emit EmployeeUpdated(_employeeAddress, _newPosition);
    }
    
    function deactivateEmployee(address _employeeAddress) 
        public 
        onlyOwner 
        employeeExists(_employeeAddress) 
    {
        employees[_employeeAddress].isActive = false;
        emit EmployeeDeactivated(_employeeAddress);
    }
    
    function addCredential(
        address _employeeAddress,
        string memory _credentialType,
        string memory _issuer,
        string memory _ipfsHash
    ) public onlyOwner employeeExists(_employeeAddress) {
        credentials[_employeeAddress].push(Credential({
            credentialType: _credentialType,
            issuer: _issuer,
            issueDate: block.timestamp,
            ipfsHash: _ipfsHash,
            verified: false
        }));
        
        emit CredentialAdded(_employeeAddress, _credentialType);
    }
    
    function verifyCredential(address _employeeAddress, uint256 _index) 
        public 
        onlyOwner 
        employeeExists(_employeeAddress) 
    {
        require(_index < credentials[_employeeAddress].length, "Invalid credential index");
        credentials[_employeeAddress][_index].verified = true;
        emit CredentialVerified(_employeeAddress, _index);
    }
    
    function getEmployee(address _employeeAddress) 
        public 
        view 
        employeeExists(_employeeAddress) 
        returns (
            string memory name,
            string memory position,
            bool isActive,
            uint256 joinDate,
            string memory department
        ) 
    {
        Employee memory emp = employees[_employeeAddress];
        return (emp.name, emp.position, emp.isActive, emp.joinDate, emp.department);
    }
    
    function getCredentialCount(address _employeeAddress) 
        public 
        view 
        employeeExists(_employeeAddress) 
        returns (uint256) 
    {
        return credentials[_employeeAddress].length;
    }
    
    function getCredential(address _employeeAddress, uint256 _index) 
        public 
        view 
        employeeExists(_employeeAddress) 
        returns (
            string memory credentialType,
            string memory issuer,
            uint256 issueDate,
            string memory ipfsHash,
            bool verified
        ) 
    {
        require(_index < credentials[_employeeAddress].length, "Invalid credential index");
        Credential memory cred = credentials[_employeeAddress][_index];
        return (cred.credentialType, cred.issuer, cred.issueDate, cred.ipfsHash, cred.verified);
    }
}
