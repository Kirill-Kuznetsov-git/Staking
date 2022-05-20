// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Stacking = await ethers.getContractFactory("Stacking");
  const rewardToken = process.env.TEST_TOKEN_ADDRESS !== undefined ? process.env.TEST_TOKEN_ADDRESS : "";
  const lpToken = process.env.UNISWAP_V2_TOKEN_ADDRESS !== undefined ? process.env.UNISWAP_V2_TOKEN_ADDRESS : "";
  const stacking = await Stacking.deploy(rewardToken, lpToken);

  await stacking.deployed();

  console.log("Stacking deployed to:", stacking.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
