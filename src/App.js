import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';


const url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false";

function App() {

  const [coins,setCoins] = useState([]);
  const [search,setSearch] = useState(['']);

  const getData = function () {
    axios.get(url)
    .then(res => {
      setCoins(res.data);
      //console.log(res.data);
    })
    .catch(error => console.log(error))
  }

  useEffect(getData, []);

  setInterval(getData, 10000);
  

  // setInterval(()=>{
  //   window.location.reload(true);
  // }, 10000);

  function handleChange(event){
    setSearch(event.target.value);
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLocaleString().toLowerCase())
  );

  return (
    
    <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Search crypto currency</h1>
          <form>
            <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
          </form>
        </div>
        {filteredCoins.map(coin => {
          return (<Coin 
          key={coin.id} 
          name={coin.name}  
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />);
        })}
    </div>
    
  );
}

export default App;
