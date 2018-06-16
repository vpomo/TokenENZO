var adrressContractMain = "0x94eea9a484f0bae03d19623cfe389e2cba56b72f";
var adrressContractRopsten = "0x84bd649fc3bdbd7f1c7cf3f8157ab48fedd4eda6";
var walletTokens = 0;
var step = 0;
var decimalToken = 10**18;

//var now = Math.round(new Date().getTime() / 1000);
var now = 1533513600; //Mon, 06 Aug 2018 00:00:00 GMT
//now = 1534694400; //Mon, 19 Aug 2018 00:00:00 GMT

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        console.log("Web3 detected!");
        window.web3 = new Web3(web3.currentProvider);
        // Now you can start your app & access web3 freely:
        var currentNetwork = web3.version.network;
        if (currentNetwork == 3 || currentNetwork == 1) {
            console.log("You are connected to the Blockchain of the Ethereum");
        } else {
            console.log("You are not connected to the network of the Ethereum");
        }
        startApp();
    } else {
        console.log("Please use Chrome or Firefox, install the Metamask extension and retry the request!");
    }
})

function startApp() {
    var contract = initContract();
    var adrressContract = adrressContractMain;
    var totalSold;
    var totalEth;
    var countInvestor;

    contract.balanceOf(adrressContract, function (error, data) {
        walletTokens = Number(data) / decimalToken;
	    console.log("balance = " + data);
        $('#walletTokens').html(walletTokens.toFixed(4));
    });
    contract.tokenAllocated(function (error, data) {
        totalSold = Number(data) / decimalToken;
        console.log("totalSold = " + data);
        $('#totalSold').html(totalSold.toFixed(4));
    });
    contract.weiRaised(function (error, data) {
        totalEth = Number(data) / decimalToken;
        console.log("totalEth = " + data);
        $('#totalEth').html(totalEth.toFixed(4));
    });
    contract.countInvestor(function (error, data) {
        countInvestor = data;
        console.log("countInvestor = " + data);
        $('#countInvestors').html(Number(countInvestor));
    });
}

$(document).ready(function () {
    calcNextWindow();
});

function initContract() {
    var address = {
        "1": adrressContractMain,
        "3": adrressContractRopsten
    }
    var current_network = web3.version.network;
    var myWalletAddress = web3.eth.accounts[0];
    if (myWalletAddress == undefined) {
        console.log("Your wallet is closed!");
    }
    $('#walletAddress').html(myWalletAddress);

    var abiContract = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"addressFundReserve","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundFoundation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newRate","type":"uint256"}],"name":"setRate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_investor","type":"address"}],"name":"getDeposited","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundTeam","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_currentDate","type":"uint256"}],"name":"getPeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finalize","outputs":[{"name":"result","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressFundFoundation","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"fundReserve","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressFundTeam","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenAllocated","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundForSale","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"transfersEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"deposited","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countInvestor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"}],"name":"claimTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_investor","type":"address"}],"name":"buyTokens","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_weiAmount","type":"uint256"}],"name":"validPurchaseTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenRaised","type":"uint256"},{"indexed":false,"name":"purchasedToken","type":"uint256"}],"name":"TokenLimitReached","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"weiAmount","type":"uint256"}],"name":"MinWeiLimitReached","type":"event"},{"anonymous":false,"inputs":[],"name":"Finalized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
    //var abiContract = $('#abiContract').val();
    //console.log("abiContract2 = " + abiContract);
    var contract = web3.eth.contract(abiContract).at(address[current_network]);
    console.log("Contract initialized successfully");
    console.log("current_network = " + current_network);
    console.log("myWalletAddress = " + myWalletAddress);

    return contract;
}

function calcNextWindow(){
    var contract = initContract();
    var currentPeriod;
    var nextPeriod;
    var amountOfTokens = 0;
    var weiAmount = 1;
    var rate = 0;
    var numberWeeks = 46;
    contract.rate(function (error, data) {
        rate = data;
        console.log("rate = " + data);
        contract.getPeriod(now, function (error, data) {
            currentPeriod = data;
            console.log("currentPeriod = " + data);
            if(currentPeriod < 100){
                nextPeriod = currentPeriod + 1;
                for(var j = 0; j < numberWeeks; j++){
                    if(nextPeriod == (j + 1)){
                        amountOfTokens = Number(weiAmount*rate)/(5+j*25);
                    }
                }
            }
            $('#costTokenNextWindow').html(amountOfTokens.toFixed(0));
        });
    });
}

function byTokens(){
    var contract = initContract();
    var currentPeriod;
    var amountOfTokens = 0;
    var weiAmount = Number($('#amountEth').val());
    var rate = 0;
    var numberWeeks = 46;
    contract.rate(function (error, data) {
        rate = data;
        console.log("rate = " + data);
        contract.getPeriod(now, function (error, data) {
            currentPeriod = data;
            console.log("currentPeriod = " + data);
            console.log("weiAmount = " + weiAmount);
            if(currentPeriod < 100){
                if(currentPeriod == 0){
                    amountOfTokens = Number(weiAmount*rate)/4;
                }
                for(var j = 0; j < numberWeeks; j++){
                    if(currentPeriod == (j + 1)){
                        amountOfTokens = Number(weiAmount*rate)/(5+j*25);
                    }
                }
            }
            console.log("amountOfTokens = " + amountOfTokens);
            $('#receiveTokens').html(amountOfTokens.toFixed(4));
        });
    });
}

function resetting() {
    location.reload();
}

