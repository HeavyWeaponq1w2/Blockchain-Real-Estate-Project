//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClientRegistry {
    // Struct to hold client details
    struct ClientLandDetails {
        int256 No_of_floors;
        int256 Built_Up_Area;
        int256 Net_Plot_Area;
        int256 Parking_Area;
        int256 No_of_Dwelling_Units;
        int256 Height_of_the_Building;
        string FileUpload;
        string SecurityKey; // Storing SecurityKey for validation
    }
    // Mappings to store client details
    mapping(string => ClientLandDetails) private clientDetails;
    // Mapping to keep track of used FileNumbers and SecurityKeys
    mapping(string => bool) private usedFileNumbers;
    mapping(string => bool) private usedSecurityKeys;

    // Function to add a new client
    function addClientLandDetails(
        string memory FileNumber,
        string memory SecurityKey,
        int256 No_of_floors,
        int256 Built_Up_Area,
        int256 Net_Plot_Area,
        int256 Parking_Area,
        int256 No_of_Dwelling_Units,
        int256 Height_of_the_Building,
        string memory FileUpload
    ) public {
        // Ensure the FileNumber is unique
        require(
            !usedFileNumbers[FileNumber],
            "File Number has already been used"
        );
        // Ensure the SecurityKey is unique
        require(
            !usedSecurityKeys[SecurityKey],
            "Security Key has already been used"
        );
        // Mark the FileNumber and SecurityKey as used
        usedFileNumbers[FileNumber] = true;
        usedSecurityKeys[SecurityKey] = true;
        // Store the client details along with SecurityKey
        clientDetails[FileNumber] = ClientLandDetails(
            No_of_floors,
            Built_Up_Area,
            Net_Plot_Area,
            Parking_Area,
            No_of_Dwelling_Units,
            Height_of_the_Building,
            FileUpload,
            SecurityKey
        );
    }

    // Function to retrieve a client's details by FileNumber and SecurityKey
    function getClientLandDetails(
        string memory FileNumber,
        string memory SecurityKey
    )
        public
        view
        returns (
            int256 No_of_floors,
            int256 Built_Up_Area,
            int256 Net_Plot_Area,
            int256 Parking_Area,
            int256 No_of_Dwelling_Units,
            int256 Height_of_the_Building,
            string memory FileUpload
        )
    {
        // Ensure the FileNumber exists
        require(usedFileNumbers[FileNumber], "File Number does not exist");
        // Ensure the SecurityKey matches
        require(
            keccak256(
                abi.encodePacked(clientDetails[FileNumber].SecurityKey)
            ) == keccak256(abi.encodePacked(SecurityKey)),
            "Invalid Security Key"
        );
        // Retrieve the client details from the mapping
        ClientLandDetails storage client = clientDetails[FileNumber];
        // Return the client's information
        return (
            client.No_of_floors,
            client.Built_Up_Area,
            client.Net_Plot_Area,
            client.Parking_Area,
            client.No_of_Dwelling_Units,
            client.Height_of_the_Building,
            client.FileUpload
        );
    }

    // Function to check if a FileNumber and SecurityKey have been used together
    function hasBeenUsedTogether(
        string memory FileNumber,
        string memory SecurityKey
    ) public view returns (bool) {
        // Check if the FileNumber exists and SecurityKey matches
        if (usedFileNumbers[FileNumber]) {
            return
                keccak256(
                    abi.encodePacked(clientDetails[FileNumber].SecurityKey)
                ) == keccak256(abi.encodePacked(SecurityKey));
        }
        return false;
    }

    // Function to check if a FileNumber has been used
    function hasFileNumberBeenUsed(
        string memory FileNumber
    ) public view returns (bool) {
        return usedFileNumbers[FileNumber];
    }

    // Function to check if a SecurityKey has been used
    function hasSecurityKeyBeenUsed(
        string memory SecurityKey
    ) public view returns (bool) {
        return usedSecurityKeys[SecurityKey];
    }
}
