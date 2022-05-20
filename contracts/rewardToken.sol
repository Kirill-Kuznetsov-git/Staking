// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";

contract ERC20 is ERCInterface {
    address owner;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint8 constant private DECIMALS = 18; // 1 token = 1 wei
    string private _name;
    string private _symbol;
    uint256 private _totalTokens;

    modifier enoughTokens(address from, uint256 value){
        require(balanceOf(from) >= value, "not enough tokens");
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "not an owner");
        _;
    }

    constructor(string memory name_, string memory symbol_, uint256 initialSupply, address account){
        _name = name_;
        _symbol = symbol_;
        owner = msg.sender;
        mint(account, initialSupply);
    }

    function name() override public view returns(string memory){
        return _name;
    }
    function symbol() override public view returns(string memory){
        return _symbol;
    }
    function decimals() override public pure returns(uint8){
        return DECIMALS;
    }
    function totalSupply() override public view returns(uint256){
        return _totalTokens;
    }

    function balanceOf(address ownerTokens) override public view returns(uint256){
        return _balances[ownerTokens];
    }
    function allowance(address ownerTokens, address spender) override public view returns(uint256){
        return _allowances[ownerTokens][spender];
    }

    function transfer(address to, uint256 value) override public enoughTokens(msg.sender, value) returns(bool){
        _balances[msg.sender] -= value;
        _balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) override public enoughTokens(from, value)  returns(bool){
        _balances[from] -= value;
        _balances[to] += value;
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint256 value) override public returns(bool){
        _allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function burn(address account, uint256 amount) override public onlyOwner{
        _balances[account] -= amount;
        _totalTokens -= amount;
    }

    function mint(address account, uint256 amount) override public onlyOwner{
        _balances[account] += amount;
        _totalTokens += amount;
    }
}
