import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI: bigint = 1_000_000_000n;

const ClientRegistyModule = buildModule("ClientRegistryModule", (m) => {
  const clientRegistry = m.contract("ClientRegistry");

  return { clientRegistry };
});

export default ClientRegistyModule;
