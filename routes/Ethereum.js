const Ethereum = require("../models/Ethereum");

const fetchingEthereum=async(days)=>{
     let data=null
    let fetched=0
        
            console.log("number of days:",days);
            try {

                 if(!data ||now-fetched>60*1000){
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
                     data =  JSON.stringify(response.data.prices)
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
            }
        
               
                
            } catch (error) {
               console.log("some error occured",error);
                
            }
        
}

module.exports=fetchingEthereum