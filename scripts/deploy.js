//hardhat 객체 생성
const hre = require("hardhat"); 

//async로 선언한 함수는 사용시에 작업이 성공하면 Promise를 반환함
//함수 사용시에는 await를 붙여 사용하면 작업이 성공하여 반환될때까지 error발생안시키고 기다렸다가 성공하면 promise를 반환함)
async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter"); //hre.ethers.getContractFactory 메소드를 이용하여 Greeter컨트랙트 불러와서 Greeter객체에 저장
  const greeter = await Greeter.deploy("Hello, Hardhat!"); //Greeter객체의 deploy 메소드를 적용하여 컨트랙트의 constructure에 인자를 넘겨준 후 생성된 greeter 컨트랙트를 저장

  await greeter.deployed(); // greeter 컨트랙트가 배포될때까지 기다린후 성공적으로 배포되면 greeter.deployed()의 promise가 반환됨

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1; //node.js 내장속성으로서 작업성공여부를 운영체제에 전달. 0은 성공, 나머지값은 실패 
});
