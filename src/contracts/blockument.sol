// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AcademicCertificateVerification {
    // Structure to represent a certificate
    struct Certificate {
        address studentAddress;
        address institutionAddress;
        string courseName;
        uint256 issueDate;
    }

    // Mapping to store certificates, indexed by their unique hash
    mapping(address => Certificate) public certificates;

    // Event emitted when a certificate is issued
    event CertificateIssued(address studentAddress, address institutionAddress);

    constructor() {

    }

    // Function to issue a new certificate
    function issueCertificate(
        address _studentAddress,
        string memory _courseName,
        uint256 _issueDate
    ) public {
        // Ensure the certificate does not already exist
        require(certificates[_studentAddress].issueDate == 0, "Certificate already exists");

        // Store the certificate in the mapping
        certificates[_studentAddress] = Certificate(_studentAddress, msg.sender, _courseName, _issueDate);

        // Emit the event that the certificate was issued
        emit CertificateIssued(_studentAddress, msg.sender);
    }

    // Function to verify a certificate by its hash
    function verifyCertificate(address _studentAddress) public view returns (bool, address, address, string memory, uint256) {
        Certificate memory cert = certificates[_studentAddress];

        // Ensure the certificate exists and is not revoked
        require(cert.issueDate != 0, "Certificate does not exist");
        // Return certificate details if valid
        return (true, cert.studentAddress, cert.institutionAddress, cert.courseName, cert.issueDate);
    }
}
