const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ClientRegistry", function () {
  let ClientRegistry;
  let clientRegistry: any;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const ClientRegistryFactory = await ethers.getContractFactory(
      "ClientRegistry"
    );
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy a new ClientRegistry contract before each test
    clientRegistry = await ClientRegistryFactory.deploy();
    await clientRegistry.waitForDeployment();
  });

  describe("Adding client land details", function () {
    it("Should add client land details successfully", async function () {
      await clientRegistry.addClientLandDetails(
        "FILE001",
        "SEC001",
        5,
        1000,
        2000,
        500,
        10,
        50,
        "ipfs://QmHash"
      );

      expect(await clientRegistry.hasFileNumberBeenUsed("FILE001")).to.equal(
        true
      );
      expect(await clientRegistry.hasSecurityKeyBeenUsed("SEC001")).to.equal(
        true
      );
    });

    it("Should not allow duplicate file numbers", async function () {
      await clientRegistry.addClientLandDetails(
        "FILE001",
        "SEC001",
        5,
        1000,
        2000,
        500,
        10,
        50,
        "ipfs://QmHash1"
      );

      await expect(
        clientRegistry.addClientLandDetails(
          "FILE001",
          "SEC002",
          6,
          1100,
          2100,
          550,
          12,
          55,
          "ipfs://QmHash2"
        )
      ).to.be.revertedWith("File Number has already been used");
    });

    it("Should not allow duplicate security keys", async function () {
      await clientRegistry.addClientLandDetails(
        "FILE001",
        "SEC001",
        5,
        1000,
        2000,
        500,
        10,
        50,
        "ipfs://QmHash1"
      );

      await expect(
        clientRegistry.addClientLandDetails(
          "FILE002",
          "SEC001",
          6,
          1100,
          2100,
          550,
          12,
          55,
          "ipfs://QmHash2"
        )
      ).to.be.revertedWith("Security Key has already been used");
    });
  });

  describe("Retrieving client land details", function () {
    beforeEach(async function () {
      await clientRegistry.addClientLandDetails(
        "FILE001",
        "SEC001",
        5,
        1000,
        2000,
        500,
        10,
        50,
        "ipfs://QmHash"
      );
    });

    it("Should retrieve client land details with correct file number and security key", async function () {
      const details = await clientRegistry.getClientLandDetails(
        "FILE001",
        "SEC001"
      );
      expect(details[0]).to.equal(5); // No_of_floors
      expect(details[1]).to.equal(1000); // Built_Up_Area
      expect(details[2]).to.equal(2000); // Net_Plot_Area
      expect(details[3]).to.equal(500); // Parking_Area
      expect(details[4]).to.equal(10); // No_of_Dwelling_Units
      expect(details[5]).to.equal(50); // Height_of_the_Building
      expect(details[6]).to.equal("ipfs://QmHash"); // FileUpload
    });

    it("Should not retrieve details with incorrect file number", async function () {
      await expect(
        clientRegistry.getClientLandDetails("FILE002", "SEC001")
      ).to.be.revertedWith("File Number does not exist");
    });

    it("Should not retrieve details with incorrect security key", async function () {
      await expect(
        clientRegistry.getClientLandDetails("FILE001", "SEC002")
      ).to.be.revertedWith("Invalid Security Key");
    });
  });

  describe("Checking usage of file numbers and security keys", function () {
    beforeEach(async function () {
      await clientRegistry.addClientLandDetails(
        "FILE001",
        "SEC001",
        5,
        1000,
        2000,
        500,
        10,
        50,
        "ipfs://QmHash"
      );
    });

    it("Should confirm file number and security key have been used together", async function () {
      expect(
        await clientRegistry.hasBeenUsedTogether("FILE001", "SEC001")
      ).to.equal(true);
    });

    it("Should confirm file number has been used", async function () {
      expect(await clientRegistry.hasFileNumberBeenUsed("FILE001")).to.equal(
        true
      );
    });

    it("Should confirm security key has been used", async function () {
      expect(await clientRegistry.hasSecurityKeyBeenUsed("SEC001")).to.equal(
        true
      );
    });

    it("Should return false for unused file number and security key combination", async function () {
      expect(
        await clientRegistry.hasBeenUsedTogether("FILE002", "SEC002")
      ).to.equal(false);
    });
  });
});
