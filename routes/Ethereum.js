const Ethereum = require("../models/Ethereum");

const fetchingEthereum=async(days)=>{
    const data=[
                [4,5],
                [6,7]
            ]
        
            console.log("number of days:",days);
            try {
 const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/ethereum/market_chart",
      {
        params: {
          vs_currency: "usd",
          days: days,
          interval: "daily",
        },
      }
    );
                    const data =  JSON.stringify(response.data.prices)
                const coinData=await Ethereum.findOne({day:days})
                if(!coinData){
                    const newData=await Ethereum.create({
                        day:days,
                        data:JSON.parse(data)
                    })
                    console.log('generated new data',newData);
                    return
                }
              
                    coinData.data=JSON.parse(data)
                    await coinData.save()
                    console.log('updated data',coinData);
            
        
               
                
            } catch (error) {
               console.log("some error occured",error);
                
            }
        
}

module.exports=fetchingEthereum