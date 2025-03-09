import { useState, useEffect } from 'react';
import { TrendingDown } from 'lucide-react';

const AccionesPeorRendimiento = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorstStocks = async () => {
      setLoading(true);
      try {
        // En un caso real, harías un fetch a tu API:
        // const response = await fetch('https://api.example.com/worst-stocks');
        // const data = await response.json();
        
        // Datos de ejemplo
        const mockData = [
          { 
            id: 1, 
            ticker: "INTC", 
            name: "Intel Corporation", 
            price: 30.85, 
            change: -5.42, 
            percentChange: -14.95, 
            volume: "58.2M",
            sector: "Semiconductores"
          },
          { 
            id: 2, 
            ticker: "GME", 
            name: "GameStop Corp.", 
            price: 14.25, 
            change: -2.35, 
            percentChange: -14.16, 
            volume: "12.7M",
            sector: "Comercio Minorista"
          },
          { 
            id: 3, 
            ticker: "PLTR", 
            name: "Palantir Technologies", 
            price: 19.87, 
            change: -2.62, 
            percentChange: -11.65, 
            volume: "41.8M",
            sector: "Software"
          },
          { 
            id: 4, 
            ticker: "NFLX", 
            name: "Netflix, Inc.", 
            price: 544.98, 
            change: -45.76, 
            percentChange: -7.75, 
            volume: "22.1M",
            sector: "Entretenimiento"
          },
          { 
            id: 5, 
            ticker: "PFE", 
            name: "Pfizer Inc.", 
            price: 26.35, 
            change: -1.87, 
            percentChange: -6.62, 
            volume: "30.5M",
            sector: "Farmacéutica"
          }
        ];
        
        // Simulamos un pequeño retraso
        setTimeout(() => {
          setStocks(mockData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("No se pudieron cargar las acciones de peor rendimiento.");
        setLoading(false);
      }
    };

    fetchWorstStocks();
  }, []);

  return (
    <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-xl shadow-lg p-5 border border-red-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-red-500 p-2 rounded-lg mr-3">
            <TrendingDown size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Acciones con Menor Rendimiento</h2>
        </div>
        <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
          Hoy
        </span>
      </div>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
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
                className={`bg-white rounded-lg p-4 border-l-4 border-red-500 shadow hover:shadow-md transition-all ${
                  index === 0 ? 'ring-2 ring-red-400 ring-opacity-50' : ''
                }`}
              >
                <div className="grid grid-cols-5 items-center">
                  <div>
                    <div className="font-bold text-gray-900">{stock.ticker}</div>
                    <div className="text-xs text-gray-500 truncate">{stock.name}</div>
                  </div>
                  <div className="font-semibold">${stock.price.toLocaleString('es-ES', {minimumFractionDigits: 2})}</div>
                  <div className="text-red-600 font-medium">${stock.change.toLocaleString('es-ES', {minimumFractionDigits: 2})}</div>
                  <div>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      {stock.percentChange.toLocaleString('es-ES', {minimumFractionDigits: 2})}%
                    </span>
                  </div>
                  <div className="text-gray-600">{stock.volume}</div>
                </div>
                <div className="mt-2 text-xs text-gray-500">{stock.sector}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-right">
            <button className="text-red-700 hover:text-red-900 font-medium text-sm hover:underline">
              Ver todas las acciones en baja →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccionesPeorRendimiento;