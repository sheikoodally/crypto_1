import React, { useState, useEffect } from 'react';

function home() {
  const [cryptoData, setCryptoData] = useState([]);

  async function getData() {
    const data1 = await fetch("http://localhost:5050/api/data")
      .then(response => response.json())
      .then(Data => {
        setCryptoData(Data.message)
        console.log(Data)
      })
    return data1;
  }
  

  useEffect(() => {
    getData();
  }, [])

  function formatDate(string){
    let options = { month: 'numeric', day: 'numeric' };
    return new Date(string).toLocaleTimeString([],options);
}

  return (
    <div className='px-[40px] py-[50px]'>
      {/* {cryptoData? 
        cryptoData?.data?.map((item) => 
          <section>
            <p>{item?.id}</p>
            <p>{item?.name}</p>
          </section>
        )
        : 
        <p>no data</p>
      } */}
      <div className='w-full'>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className='text-left'>Name</th>
              <th className='text-left'>Price</th>
              <th className='text-left'>Change (1hr)</th>
              <th className='text-left'>Change (24hr)</th>
              <th className='text-left'>Supply</th>
              <th className='text-left'>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData? 
              cryptoData?.data?.map((item) => 
                <tr>
                  <td>{item?.name} ({item.symbol})</td>
                  <td>{item?.quote?.USD?.price.toFixed(7)}</td>
                  <td>{item?.quote?.USD?.percent_change_1h? item?.quote?.USD?.percent_change_1h.toFixed(3) : '0'}</td>
                  <td>{item?.quote?.USD?.percent_change_1h? item?.quote?.USD?.percent_change_24h.toFixed(3) : '0'}</td>
                  <td>{item?.total_supply.toFixed(3)}</td>
                  <td >{formatDate(item?.last_updated)}</td>
                </tr>
              )
              : 
              <p>no data</p>
            }
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default home