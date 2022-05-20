import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {get_contract as get_contract} from "./init";

task("stake", "Freeze some amount of tokens")
    .addParam("amount", "Amount of token")
    .setAction(async(taskArgs, hre) => {
        const amount = taskArgs.amount;
        const contract = await get_contract(hre);
        contract.stake(amount);
    })