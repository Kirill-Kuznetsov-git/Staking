import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {get_contract as get_contract} from "./init";

task("claim", "Get reward tokens")
    .setAction(async(taskArgs, hre) => {
        const contract = await get_contract(hre);
        contract.claim();
    })