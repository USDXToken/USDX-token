/* global artifacts, contract, it, assert */
/* eslint-disable prefer-reflect */

const UstxToken = artifacts.require('UstxToken.sol');


const invalidAccount = '0x0';

contract('UstxToken', (accounts) => {


    it('should mint token when converting to stable coins if exchange rate > 100', async () =>{
        let token = await UstxToken.new();
        await token.transfer(accounts[1],100);
        await token.transfer(accounts[2],200);
        await token.transfer(accounts[3],300);
        await token.transfer(accounts[4],400);
        await token.transfer(accounts[5],500);
        let exchangeRate = 200;
        await token.setExchangeRate(exchangeRate);

        await token.stableCoins();
        let balance0 = await token.balanceOf.call(accounts[0]);
        let balance1 = await token.balanceOf.call(accounts[1]);
        let balance2 = await token.balanceOf.call(accounts[2]);
        let balance3 = await token.balanceOf.call(accounts[3]);
        let balance4 = await token.balanceOf.call(accounts[4]);
        let balance5 = await token.balanceOf.call(accounts[5]);

        assert.equal(balance0.toNumber(),3000);
        assert.equal(balance1.toNumber(),200);
        assert.equal(balance2.toNumber(),400);
        assert.equal(balance3.toNumber(),600);
        assert.equal(balance4.toNumber(),800);
        assert.equal(balance5.toNumber(),1000);

        let totalSupply = await token.totalSupply.call();
        assert.equal(totalSupply, 6000);
    });

    it('conversion to stable token when exchange rate < 100', async () =>{
        let token = await UstxToken.new();
        await token.transfer(accounts[1],100);
        await token.transfer(accounts[2],200);
        await token.transfer(accounts[3],300);
        await token.transfer(accounts[4],400);
        await token.transfer(accounts[5],500);
        let exchangeRate = 90;
        await token.setExchangeRate(exchangeRate);

        await token.stableCoins();
        let balance0 = await token.balanceOf.call(accounts[0]);
        let balance1 = await token.balanceOf.call(accounts[1]);
        let balance2 = await token.balanceOf.call(accounts[2]);
        let balance3 = await token.balanceOf.call(accounts[3]);
        let balance4 = await token.balanceOf.call(accounts[4]);
        let balance5 = await token.balanceOf.call(accounts[5]);

        assert.equal(balance0.toNumber(),1350);
        assert.equal(balance1.toNumber(),90);
        assert.equal(balance2.toNumber(),180);
        assert.equal(balance3.toNumber(),270);
        assert.equal(balance4.toNumber(),360);
        assert.equal(balance5.toNumber(),450);

        let totalSupply = await token.totalSupply.call();
        assert.equal(totalSupply, 2700);
    });

});