# trbac-contract

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Web3](https://web3js.readthedocs.io/en/v1.5.2/) (Blockchain Interaction)
- [Truffle](https://www.trufflesuite.com/docs/truffle/overview) (Development Framework)
- [Ganache](https://www.trufflesuite.com/ganache) (For Local Blockchain)
- [Infura.io](https://infura.io/) (For copying the Ethereum mainnet)
- [MetaMask](https://metamask.io/) (Ethereum Wallet)
- [Git](https://git-scm.com/)/[GitHub](https://github.com) (Commit our code)

## Requirements for initial Setup
- Install [NodeJS](https://nodejs.org/en/)
```bash
$ nvm install v14.19.2
```

- Install [Truffle](https://www.trufflesuite.com/docs/truffle/overview)
```bash
# version 5.5.13
$ npm install -g truffle 
```

- Install [Ganache](https://www.trufflesuite.com/ganache) version 7.1.0

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies
```bash
$ npm install
```

### 3. Smart Contract Compile
```bash
$ npx truffle compile
```

### 4. Start Ganache

### 5. Migrate Smart Contracts
```bash
# local chain
$ npx truffle migrate --network development
```

### 6. Interacting from the Console
```bash
# local chain 연결
$ npx truffle console --network development
```

### Test
```bash
$ npm run test
```
