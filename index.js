const express = require("express");
const axios = require("axios");
const cron = require('node-cron'); 

const cors = require("cors");
const  fetchinggBitcoin  = require("./routes/Bitcoin");
const FetchingSolana = require("./routes/Solona");
const  mongoose  = require("mongoose");
const fetchingEthereum = require("./routes/Ethereum");
const fetchingBinance = require("./routes/BinanceCoin");
const fetchingRipple = require("./routes/Ripple");
const Bitcoin = require("./models/Bitcoin");
const BinanceCoin = require("./models/BinanceCoin");
const Ethereum = require("./models/Ethereum");
const Ripple = require("./models/Ripple");
const Solana = require("./models/Solana");

const app = express();
app.use(cors()); // enable for all domains

const PORT = 5000;
const DAILY_RUN_TIME='52 6 * * *'

const daysList=[1,7,30,60,180,365]
async function connectDB() {
  try {
    
    await mongoose.connect('mongodb+srv://surajithalder088:VYVHy3RVPesm0EPL@cluster0.aztocg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
      {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  }
}

app.get("/api/coin/:coinId", async (req, res) => {
  const { coinId } = req.params;
  const days = Number(req.query.days) ;

  if(!daysList.includes(days)){
    return res.status(400).json({message:"no data in this days time period",days})
  }

  try {
    // const response = await axios.get(
    //   "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
    //   {
    //     params: {
    //       vs_currency: "usd",
    //       days: "30",
    //       interval: "daily",
    //     },
    //   }
    // );
    

    // if (!response.ok) {
    //   return res.status(response.status).json({ error: "Failed to fetch from CoinGecko" });
    // }

    //const data =  JSON.stringify(response.data.prices)
   // console.log(response.data);
   if(coinId==='bitcoin'){
    const bitcoinData=await Bitcoin.findOne({day:days})
    if(!bitcoinData){
       hitRoutesSequentially()
      return res.status(404).json({message:"no data found"})
    }
    return res.status(200).json(bitcoinData)
   }
  else if(coinId==='binance'){
    const binanceData=await BinanceCoin.findOne({day:days})
    if(!binanceData){
       hitRoutesSequentially()
      return res.status(404).json({message:"no data found"})
    }
    return res.status(200).json(binanceData)
   }
  else  if(coinId==='ethereum'){
    let ecoinData=await Ethereum.findOne({day:days})
    if(!ecoinData){
       hitRoutesSequentially()
      return res.status(404).json({message:"no data found"})
    }
    return res.status(200).json(ecoinData)
   }
   else if(coinId==='ripple'){
     const rcoinData=await Ripple.findOne({day:days})
    if(!rcoinData){
       hitRoutesSequentially()
      return res.status(404).json({message:"no data found"})
    }
    return res.status(200).json(rcoinData)
   }
    else if(coinId==='solana'){
     const scoinData=await Solana.findOne({day:days})
    if(!scoinData){
       hitRoutesSequentially()
      return res.status(404).json({message:"no data found"})
    }
    return res.status(200).json(scoinData)
   }
   else{
    return res.status(400).json({message:"wrong coin name"})
   }
   
    
  
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server Error" ,err});
  }
});

const hitRoutesSequentially=async ()=>{
  fetchinggBitcoin(1)
  await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
   fetchinggBitcoin(7)
  await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
  fetchinggBitcoin(15)
  await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
   fetchinggBitcoin(30)
  await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
   fetchinggBitcoin(60)
  await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
   fetchinggBitcoin(180)
  await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
   fetchinggBitcoin(365)
  await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes

   fetchingBinance(1)
     await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
       fetchingBinance(7)
     await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
      fetchingBinance(15)
     await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
       fetchingBinance(30)
     await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
       fetchingBinance(60)
     await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
       fetchingBinance(180)
     await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
       fetchingBinance(365)
     await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
      
  fetchingEthereum(1)
    await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
     fetchingEthereum(7)
    await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
     fetchingEthereum(15)
    await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
     fetchingEthereum(30)
    await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
     fetchingEthereum(60)
    await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
     fetchingEthereum(180)
    await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
     fetchingEthereum(365)
    await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes

  fetchingRipple(1)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
    fetchingRipple(7)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
    fetchingRipple(15)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
    fetchingRipple(30)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
    fetchingRipple(60)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
    fetchingRipple(180)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
    fetchingRipple(365)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes

   FetchingSolana(1)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
   FetchingSolana(7)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
   FetchingSolana(15)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
   FetchingSolana(30)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
   FetchingSolana(60)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
   FetchingSolana(180)
   await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000));// 1 minutes
   FetchingSolana(365)


   console.log("End of daily schedule");
   

}

cron.schedule(DAILY_RUN_TIME, () => {
  console.log("⏰ Daily schedule triggered");
  hitRoutesSequentially()
}, {
  timezone: "Asia/Kolkata"
});

app.listen(PORT, () => {
  connectDB()
  console.log(`Server running at http://localhost:${PORT}`);
});
