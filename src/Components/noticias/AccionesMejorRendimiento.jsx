import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

const AccionesMejorRendimiento = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopStocks = async () => {
      setLoading(true);
      try {
        // En un caso real, harías un fetch a tu API:
        // const response = await fetch('https://api.example.com/top-stocks');
        // const data = await response.json();
        
        // Datos de ejemplo
        const mockData = [
          { 
            id: 1, 
            ticker: "NVDA", 
            name: "NVIDIA Corporation", 
            price: 872.35, 
            change: 8.42, 
            percentChange: 9.68, 
            volume: "48.2M",
            sector: "Tecnología"
          },
          { 
            id: 2, 
            ticker: "AMD", 
            name: "Advanced Micro Devices", 
            price: 176.82, 
            change: 12.54, 
            percentChange: 7.64, 
            volume: "32.5M",
            sector: "Semiconductores"
          },
          { 
            id: 3, 
            ticker: "SOFI", 
            name: "SoFi Technologies", 
            price: 9.87, 
            change: 0.62, 
            percentChange: 6.70, 
            volume: "21.8M",
            sector: "Fintech"
          },
          { 
            id: 4, 
            ticker: "TSLA", 
            name: "Tesla Inc.", 
            price: 189.98, 
            change: 10.43, 
            percentChange: 5.81, 
            volume: "56.7M",
            sector: "Automotriz"
          },
          { 
            id: 5, 
            ticker: "AMZN", 
            name: "Amazon.com Inc.", 
            price: 178.75, 
            change: 7.82, 
            percentChange: 4.58, 
            volume: "33.1M",
            sector: "Comercio Electrónico"
          }
        ];
        
        // Simulamos un pequeño retraso
        setTimeout(() => {
          setStocks(mockData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("No se pudieron cargar las acciones de mejor rendimiento.");
        setLoading(false);
      }
    };

    fetchTopStocks();
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-lg p-5 border border-green-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-green-500 p-2 rounded-lg mr-3">
            <TrendingUp size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Acciones con Mayor Rendimiento</h2>
        </div>
        <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
          Hoy
        </span>
      </div>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-5 text-xs font-medium text-gray-500 mb-2 px-3">
            <div>Símbolo</div>
            <div>Precio</div>
            <div>Cambio</div>
            <div>% Cambio</div>
            <div>Volumen</div>
          </div>
          
          <div className="space-y-3">
            {stocks.map((stock, index) => (
              <div 
                key={stock.id} 
                className={`bg-white rounded-lg p-4 border-l-4 border-green-500 shadow hover:shadow-md transition-all ${
                  index === 0 ? 'ring-2 ring-green-400 ring-opacity-50' : ''
                }`}
              >
                <div className="grid grid-cols-5 items-center">
                  <div>
                    <div className="font-bold text-gray-900">{stock.ticker}</div>
                    <div className="text-xs text-gray-500 truncate">{stock.name}</div>
                  </div>
                  <div className="font-semibold">${stock.price.toLocaleString('es-ES', {minimumFractionDigits: 2})}</div>
                  <div className="text-green-600 font-medium">+${stock.change.toLocaleString('es-ES', {minimumFractionDigits: 2})}</div>
                  <div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      +{stock.percentChange.toLocaleString('es-ES', {minimumFractionDigits: 2})}%
                    </span>
                  </div>
                  <div className="text-gray-600">{stock.volume}</div>
                </div>
                <div className="mt-2 text-xs text-gray-500">{stock.sector}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-right">
            <button className="text-green-700 hover:text-green-900 font-medium text-sm hover:underline">
              Ver todas las acciones en alza →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccionesMejorRendimiento;