import { expect } from "chai";
import { ethers } from "hardhat";
import {BigNumber, Signer} from "ethers";
import { Stacking, Stacking__factory, IUniswapV2Factory, IUniswapV2Router02, IUniswapV2Pair, ERCInterface, ERC20__factory } from "../typechain";
import { basename } from "path";
import { IERC20Interface } from "../typechain/IERC20";


describe("Stacking", function () {
  let contract: Stacking;
  let factory: IUniswapV2Factory;
  let router: IUniswapV2Router02;
  let accounts: Signer[];
  let pair: string;
  let rewardToken: ERCInterface;
  let lpToken: ERCInterface;

  beforeEach(async function () {
    accounts = await ethers.getSigners()

    router = await ethers.getContractAt("IUniswapV2Router02", process.env.ROUTER_ADDRESS as string, accounts[0])
    factory = await ethers.getContractAt("IUniswapV2Factory", process.env.FACTORY_ADDRESS as string, accounts[0])

    const ERCFactory = new ERC20__factory(accounts[0])
    rewardToken = await ERCFactory.deploy("TestToken", "TT", 10000000, await accounts[0].getAddress())

    lpToken = await ethers.getContractAt("ERCInterface", process.env.UNISWAP_V2_TOKEN_ADDRESS as string);

    const ERCEngine = await new Stacking__factory(accounts[0])
    contract = await ERCEngine.deploy(rewardToken.address, lpToken.address);
    
    await rewardToken.deployed()
    await contract.deployed() 
  })

  it("Function Stake", async function () {
    await rewardToken.mint(await accounts[0].getAddress(), 500000)
    await rewardToken.approve(router.address, ethers.BigNumber.from(100));
    console.log(await rewardToken.allowance(await accounts[0].getAddress(), router.address))
    const tokenValue = 50
    const ethValue = 10
    console.log(await accounts[0].getBalance())
    console.log(await rewardToken.balanceOf(await accounts[0].getAddress()))
    console.log(await router.addLiquidityETH(rewardToken.address, ethers.BigNumber.from(tokenValue),
     ethers.BigNumber.from(tokenValue), ethers.BigNumber.from(ethValue), await accounts[0].getAddress(), 10653047684, {value: ethers.BigNumber.from(ethValue)}))
    console.log(await contract.stake(await lpToken.balanceOf(await accounts[0].getAddress())))
  });
});