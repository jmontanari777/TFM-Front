import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "cuhqno9r01qk32qa2ce0cuhqno9r01qk32qa2ceg";

const indices = {
  europe: [
    { symbol: "MSFT", name: "DAX" },
    { symbol: "QQQ", name: "IBEX 35" },
    { symbol: "IBM", name: "Euro Stoxx" },
  ],
  us: [
    { symbol: "MTS", name: "S&P 500" },
    { symbol: "BKT", name: "NASDAQ" },
    { symbol: "IAG", name: "Dow Jones" },
  ],
  asia: [
    { symbol: "FAE", name: "Nikkei 225" },
    { symbol: "FDR", name: "Hang Seng" },
    { symbol: "NVDA", name: "Shanghai C" },
  ],
};

const Indices = () => {
  const [activeRegion, setActiveRegion] = useState("europe");
  const [indexData, setIndexData] = useState({ europe: [], us: [], asia: [] });

  const fetchRegionIndices = async (region) => {
    try {
      const responses = await Promise.all(
        indices[region].map((index) =>
          axios.get(`https://finnhub.io/api/v1/quote?symbol=${index.symbol}&token=${API_KEY}`)
        )
      );

      return responses.map((response, i) => ({
        name: indices[region][i].name,
        price: response.data?.c ?? "N/A",
        change: response.data?.d ?? 0,
        percentChange: response.data?.dp ?? 0,
      }));
    } catch (err) {
      return [];
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [europeData, usData, asiaData] = await Promise.all([  //Aqui se almacenan los indices
          fetchRegionIndices("europe"),
          fetchRegionIndices("us"),
          fetchRegionIndices("asia"),
        ]);
        setIndexData({ europe: europeData, us: usData, asia: asiaData });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
    // Aqui se setea la frecuencia de lectura de los indices en la API 
    const interval = setInterval(fetchAllData, 100000); //Uso normalmente 100000 para retrasar el limite 
    return () => clearInterval(interval);  //de peticiones de la API  de Finnhub
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center space-x-2 mb-2">
        {["europe", "us", "asia"].map((region) => (
          <button   // Aqui estan los botones para seleccionar las regiones a visualizar
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`btn btn-xs text-black border-none ${
              activeRegion === region 
                ? "bg-[#46695a] hover:bg-[#46695a]" 
                : "bg-transparent hover:bg-[#46695a]/20"
            }`}
          >
            {region === "europe" ? "Europa" : region === "us" ? "EE.UU." : "Asia"}
          </button>
        ))}
      </div>
         
      <div className="flex-1 overflow-auto">  {/* Aqui se grafican las cajas de los indices */}
        <div className="flex flex-col space-y-2">
          {indexData[activeRegion]?.map((index, i) => (
            <div 
              key={i} 
              className="rounded-lg shadow-sm p-2 flex items-center justify-between h-14"
              style={{ backgroundColor: "##638a63" }} //Color de las cajas en donde se grafican los indices
            >
              <div className="w-8">
                {index.change > 0 ? (
                  <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : index.change < 0 ? (
                  <svg className="w-6 h-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                )}
              </div>

              <div className="flex-1 text-center">
                <div className="text-sm font-semibold text-black">{index.name}</div>
                <div className="text-base font-bold text-black">
                  {index.price !== "N/A" ? index.price.toFixed(2) : "N/A"}
                </div>
              </div>

              <div className="text-right w-20">
                <div className={`text-sm font-semibold ${
                  index.change >= 0 ? "text-success" : "text-error"
                }`}>
                  {index.change.toFixed(2)}
                </div>
                <div className={`text-xs ${
                  index.percentChange >= 0 ? "text-success" : "text-error"
                }`}>
                  {index.percentChange.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Indices;