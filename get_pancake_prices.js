
const Web3 = require('web3');
const JSBI = require('jsbi');


const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
InputTokenAddr = BUSD
OutputTokenAddr = WBNB

const pancake_factory_address = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"



const web3 = new Web3(
   new Web3.providers.WebsocketProvider('you own bsc node or node from service like ankr.com')



);


if(web3.eth.net.isListening()){
    console.log(`am connected network`);    
}
else{
    console.log(`not connected to network`);
}






const init = async () => {


  

  var fs = require('fs');
  var jsonFile = "pancake_factory.json";
  var parsed= JSON.parse(fs.readFileSync(jsonFile));
  var factory1 = new web3.eth.Contract(parsed, pancake_factory_address)
   

  var jsonFile = "pancakepair.json";
  var parsed_pair= JSON.parse(fs.readFileSync(jsonFile));
    
   

  

  const pair_address = await factory1.methods.getPair(InputTokenAddr,OutputTokenAddr).call();
  var pair1 = new web3.eth.Contract(parsed_pair, pair_address);




 

 
  web3.eth.subscribe('newBlockHeaders')
    .on('data', async block => {
      try{
      
        var reserves = await pair1.methods.getReserves().call();
        reserve0 = Number(reserves[0])
        reserve1  = Number(reserves[1])
        console.log(`The current  price is : ${reserve1/reserve0}`);
   
      }
      catch(e){
        console.log(e);
      }
     

    })
    .on('error', error => {
      console.log(error);
    });
    
}
init();

