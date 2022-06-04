*I.* NOte: Cần phân biệt web3 provider và web3js:
- web3 provider đang muốn nói đến những provider đóng vai trò là cầu nối giữa UI(ví dụ web) với mạng blockchain: ví metamask hoặc các Ethereum provider khác(ví dụ truffle/hdwallet-provider)
- web3js là một thư viện đóng vai trò làm provider. thư viện này sẽ kết nối với mạng blockchain thông qua HTTP/IPC/Websocket:
   - Nếu cần tương tác với web3js qua UI, thường ở web sẽ dùng ví điện tử metamask: Dùng khi người dùng muốn tương tác với blockchain
   - còn lại, có thể dùng web3js kết nối trực tiếp với blockchain qua http provider, hoặc mấy phương thức còn lại(IPC/Websocket): Hay dùng khi deploy smartcontract...

B1: Viết contract

B2: Compile contract sang dạng bytecode(ABI, interface....)

B3: Deploy bytecode lên mạng blockchain
- Khởi tạo web3 provider thông qua web3js:
  - tạo web3 provider thông qua web3js + metamask(chỉ ở client):
  ```js
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
  ```


  - tạo web3 provider thông qua http provider(có thể ở ssr):
  ```js
    const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/443ec6c3dca9484196d8eb95ddc99dbc"
    );
    web3 = new Web3(provider);
  ```
  => dùng web3 + Ethereum provider(truffle/hdwallet-provider) để deploy

B4: Web3 sẽ tương tác với contract từ UI thông qua ABI mà contract expose từ bytecode


*II. Q&A*

What are the requirements for deploying a smart contract on the Ethereum network?
- Bytecode của smart contract
- Có một account address trên Ethereum và một lượng ether đủ để deploy smart contract
- Địa chỉ ví để tạo transaction
- Một tool để tạo transaction và tương tác với ví: web3 + provider