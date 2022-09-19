# ![image](https://user-images.githubusercontent.com/68905333/190940673-e5681e97-a5c0-480a-bfb3-9e06066a4463.png)
# Contrity
<table>
<tr>
<td>
  A dapp that lets you reward your contributors in a revolutionary and digital way aka The New Way.
</td>
</tr>
</table>


## Demo
Here is a working live demo :  https://contrity.vercel.app/


## Site

### Home
![image](https://user-images.githubusercontent.com/68905333/190940880-a493bd73-ba04-43e3-84f2-9ad96dd081b8.png)

### Pr pages for a repo and user prs
![image](https://user-images.githubusercontent.com/68905333/190940950-13457127-a357-4ec7-9bc3-ec8122dc35ca.png)
![image](https://user-images.githubusercontent.com/68905333/190941031-ed1828df-992c-4566-bf36-ae74307ba69f.png)

## Pr detail page
![image](https://user-images.githubusercontent.com/68905333/190940673-e5681e97-a5c0-480a-bfb3-9e06066a4463.png)

## Minting the nft
![image](https://user-images.githubusercontent.com/68905333/190941244-b6545c0c-5acc-43a9-8cb0-d2781dbbb108.png)

### Development
- Clone the repo
- To run on local chain 
  1. install the hardhat dependencies 
  ``` yarn install ```
  2. run the node
  ``` yarn dev ```
  3. Adjust the wagmi config to point to the local rpc server
  4. deploy the contracts locally
  ``` npx hardhat run scripts/deploy.js --network localhost ```
- To run on polygon chain
  1. deploy the contracts
  ``` npx hardhat run scripts/deploy.js --network matic ```
- run the client
 ``` cd client ```
 ``` yarn dev ```
 - visit http://localhost:3000
 
### Bug / Feature Request

If you find a bug, kindly open an issue.

If you'd like to request a new function, feel free to do so by opening an issue.


## Built with 
- Nextjs
- Polygon
- Solidity
- Wagmi hooks
- Ethers js

## Team

[![Haridarshan](https://avatars.githubusercontent.com/u/68905333?v=3&s=144)](https://github.com/hdck007)  | [![Harshal](https://avatars.githubusercontent.com/u/65395607?v=3&s=144)](https://github.com/harshalkaigaonkar)
---|---
[Haridarshan](https://github.com/hdck007) |[Harshal](https://github.com/harshalkaigaonkar)


