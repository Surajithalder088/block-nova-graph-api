const { default: axios } = require("axios");
const Bitcoin = require("../models/Bitcoin");


const fetchinggBitcoin=async(days)=>{

     let data=null
    let fetched=0
   


    console.log("number of days:",days);
    try {

        if(!data ||now-fetched>60*1000){
         const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
      {
        params: {
          vs_currency: "usd",
          days: days,
          interval: "daily",
        },
      }
    );
    const data =  JSON.stringify(response.data.prices)
        const bitcoinData=await Bitcoin.findOne({day:days})
        if(!bitcoinData){
            const newData=await Bitcoin.create({
                day:days,
                data:JSON.parse(data)
            })
            console.log('generated new data',newData);
            return
        }
      
            bitcoinData.data=JSON.parse(data)
            await bitcoinData.save()
            console.log('updated data',bitcoinData);
            
}
       
        
    } catch (error) {
       console.log("some error occured",error);
        
    }
    

}

module.exports=fetchinggBitcoin
