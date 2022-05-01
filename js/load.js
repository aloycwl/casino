var loaded;
async function search() {
  d = await contract.room($('#txtRoom').val()).call();
  $('#searched').html(d.hidden);
}
async function load() {
  if (ethereum) {
    web3 = new Web3(ethereum);
    web3 = web3.eth;
    acct = await ethereum.request({ method: 'eth_requestAccounts' });
    if ((await web3.net.getId()) != 4) {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
      });
      location.reload();
    }
    contract = new web3.Contract(
      [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'a',
              type: 'uint256',
            },
          ],
          name: 'CHECK',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'a',
              type: 'uint256',
            },
          ],
          name: 'DEAL',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'a',
              type: 'uint256',
            },
          ],
          name: 'DEPOSIT',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'a',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'b',
              type: 'uint256',
            },
          ],
          name: 'JOIN',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'a',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'b',
              type: 'address',
            },
          ],
          name: 'LEAVE',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'a',
              type: 'uint256',
            },
          ],
          name: 'WITHDRAW',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'a',
              type: 'uint256',
            },
          ],
          name: 'getRoomInfo',
          outputs: [
            {
              internalType: 'address[]',
              name: 'b',
              type: 'address[]',
            },
            {
              internalType: 'uint256[5]',
              name: 'c',
              type: 'uint256[5]',
            },
            {
              internalType: 'uint256[5]',
              name: 'd',
              type: 'uint256[5]',
            },
            {
              internalType: 'uint256[5]',
              name: 'e',
              type: 'uint256[5]',
            },
            {
              internalType: 'uint256[5]',
              name: 'f',
              type: 'uint256[5]',
            },
            {
              internalType: 'uint256[5]',
              name: 'g',
              type: 'uint256[5]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'player',
          outputs: [
            {
              internalType: 'uint256',
              name: 'points',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'playing',
              type: 'bool',
            },
            {
              internalType: 'uint256',
              name: 'room',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'balance',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'room',
          outputs: [
            {
              internalType: 'uint256',
              name: 'betSize',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'balance',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'playerCount',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'hidden',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      '0xC1Df3e705b44bFf0A45a0200619092c9c91450Dc'
    );
    contract = contract.methods;
    contract2 = new web3.Contract(
      [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      '0x039f8E3fC2A81108784c7347d68082a7b694202F'
    );
    refreshInfo();
  } else $('#connect').html('No Metamask');
}
async function refreshInfo() {
  player = await contract.player(acct[0]).call();
  $('#info').html(`You are in room ${player.room},
  Balance: ${player.balance}, WAC tokens:
  ${(await contract2.methods.balanceOf(acct[0]).call()) / 1e18}`);
}
async function isWeb3() {
  await web3.getAccounts().then((d) => {
    if (d.length > 0) {
      $('#connect').hide();
      $('#root').show();
      if (!loaded) {
        //loadNFTs();
        loaded = true;
      }
    } else {
      $('#connect').show();
    }
  });
}
setInterval(isWeb3, 1000);
load();
