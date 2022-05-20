import "@nomiclabs/hardhat-waffle";
import {HardhatRuntimeEnvironment} from "hardhat/types";


export async function get_contract(hre: HardhatRuntimeEnvironment) {
    let CONTRACT_ADDRESS: string
    if (`${process.env.NETWORK}` == 'LOCALHOST'){
        CONTRACT_ADDRESS = `${process.env.CONTRACT_ADDRESS_LOCALHOST}`;
    } else {
        CONTRACT_ADDRESS = `${process.env.CONTRACT_ADDRESS_GOERLI}`;
    }
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];
    const Factory = await hre.ethers.getContractFactory("Stacking", signer);
    return new hre.ethers.Contract(
        CONTRACT_ADDRESS,
        Factory.interface,
        signer
    )
}