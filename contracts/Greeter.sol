//참고 (Nader Davit) https://youtu.be/a0osIaAOFSE?si=aRpne50nM__xdqJ0
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//아래처럼 쓰면 컴파일러는 실제로는 프로젝트폴더명/node_modules/hardhat 디렉토리에서 console.sol을 찾게 됨
import "hardhat/console.sol"; //vscode extensions에서 일반 solidity말고 Solidity and Hardhat support by the Hardhat team을 적용해야 에러표시가 사라짐

contract Greeter {
  string greeting; 

  constructor(string memory _greeting) {
    console.log("Deploying a Greeter with greeting:", _greeting);
    greeting = _greeting;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }
}