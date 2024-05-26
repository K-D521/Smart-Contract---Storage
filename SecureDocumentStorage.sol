
// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.2 <0.9.0;

contract SecureDocumentStorage {
    struct Document {
        string data;
        bytes32 dataHash;
    }

    mapping(address => Document) private storedDocuments;

    function retrieveDocument() public view returns (string memory, bytes32, bool) {
        Document memory doc = storedDocuments[msg.sender];
        bytes32 calculatedHash = keccak256(abi.encodePacked(doc.data));
        bool isAuthentic = (calculatedHash == doc.dataHash);
        return (doc.data, doc.dataHash, isAuthentic);
    }

        function saveDocument(string memory _data) public {
        bytes32 documentHash = keccak256(abi.encodePacked(_data));
        storedDocuments[msg.sender] = Document(_data, documentHash);
    }
}
