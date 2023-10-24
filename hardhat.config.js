require("@nomiclabs/hardhat-waffle"); //이거 안쓰면 에러발생함 이렇게 --> TypeError: Cannot read properties of undefined (reading 'getContractFactory')

module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: './bicorn/src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};