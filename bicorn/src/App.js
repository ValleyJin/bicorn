import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';// abi 임포트
// import ethers from 'ethers';
const ethers = require("ethers") // 바로위의 import로 하면 에러나서 require 문으로 다시 설정해줌

// 블록체인에 배포시 생성된 스마트컨트랙트의 주소를 변수로 저장
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [greeting, setGreetingValue] = useState('')

  // 일단 사용자의 MetaMask 계정에 접근을 요청하는 함수
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' }); 
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') { //메타마스크가 설치되어있는 경우만 실행

      // provider 객체를 먼저 만들고
      // 지금은 v5라서 아래 문장이 맞미나 ethers v6에서는 이렇게 바뀜 --> provider = new ethers.BrowserProvider(window.ethereum)
      // providers는 이더리움 노드와 연결을 만들고 블록, 트랜잭션 조회등을 수행하는 객체
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      

      //provider객체와 컨트랙트주소, abi를 ethers.Contract() 함수안에 인자로 넣어서 컨트랙트 객체를 생성
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider); 
      try {
        const data = await contract.greet();
        console.log('data: ', data);      
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  // call the smart contract, send an update
  async function setGreeting() {
    //greeting이 null,undefined,,0 이 아닌 경우에 아래 코드 return하는 함수. javascript의 조건문안에서  null,undefined,,0 은 false로 변환된다. 
    if (!greeting) return 
    if (typeof window.ethereum !== 'undefined') { //메타마스크가 설치되어있는 경우만 실행
      await requestAccount() // 일단 사용자의 MetaMask 계정에 접근을 요청하는 함수

    
      // 지금은 v5라서 아래 문장이 맞미나 ethers v6에서는 이렇게 바뀜 --> provider = new ethers.BrowserProvider(window.ethereum)
      const provider = new ethers.providers.Web3Provider(window.ethereum); //providers는 이더리움 노드와 연결을 만들고 블록, 트랜잭션 조회등을 수행하는 객체
      const signer = provider.getSigner() //to get a list of accounts in the node you're connecting to.
      
      //컨트랙트주소, abi, 연결된 네트워크에 존재하는 게정주소 리스트를 ethers.Contract() 함수안에 인자로 넣어서 컨트랙트 객체를 생성
      //Contract 객체는 3가지 인자를 활용해서 transaction을 수행할 수 있게 된다
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer) 
      const transaction = await contract.setGreeting(greeting) //컨트랙트 객체의 매소드로 존재하는 컨트랙트의 setGreeting() 함수를 호출하고 인자로 greeting을 넘겨줌
      await transaction.wait()
      fetchGreeting()
    }
  }

// 상기까지는 JS영역이므로 주석은 //로 처리
// 아래부터는 React JSX 문법 영역이므로 {/* */}로 주석 처리
// javascript요소들은 { }로 감싸서 사용해야함
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>

        {/* input필드에 입력한 값을 담고있는 이벤트객체 e를 가져와서 e.target.value 매소드로 값을 뽑아내서 setUseAccount함수에 인자로 넣어준다 */}
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />

        {/* <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button> */}

        {/* input필드에 입력한 값을 담고있는 이벤트객체 e를 가져와서 e.target.value 매소드로 값을 뽑아내서 setUseAccount함수에 인자로 넣어준다 */}
        {/* <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />  */}

        {/* input필드에 입력한 값을 담고있는 이벤트객체 e를 가져와서 e.target.value 매소드로 값을 뽑아내서 setAmout함수에 인자로 넣어준다 */}
        {/* <input onChange={e => setAmount(e.target.value)} placeholder="Amount" /> */}
      </header>
    </div>
  );
}

export default App;
