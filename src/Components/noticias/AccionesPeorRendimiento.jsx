import { useState, useEffect } from 'react';
import { TrendingDown } from 'lucide-react';

const AccionesPeorRendimiento = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStocks = async () => {
      setLoading(true);
      const mockData = [
        { id: 1, ticker: "INTC", price: 30.85, change: -5.42, percentChange: -14.95 },
        { id: 2, ticker: "GME", price: 14.25, change: -2.35, percentChange: -14.16 },
        { id: 3, ticker: "PLTR", price: 19.87, change: -2.62, percentChange: -11.65 },
      ];
      setTimeout(() => {
        setStocks(mockData);
        setLoading(false);
      }, 800);
    };

    fetchTopStocks();
  }, []);

  return (
    <div className="bg-[#fafafa] rounded-xl shadow-lg p-4 border border-[#e1e3ac]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-[#638a63] p-1.5 rounded-lg mr-2">
          <TrendingDown size={18} className="text-[#d60225]" />
          </div>
          <h2 className="text-lg font-bold text-[#223536]">Acciones en alza</h2>
        </div>
      </div>

      {loading ? (
        <div className="h-40 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#e1e3ac] border-t-[#638a63] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          <div className="text-xs font-medium text-[#46695a] mb-2">
            {stocks.map((stock) => (
              <div
                key={stock.id}
                className="bg-white rounded-lg p-3 mb-2 border-l-4 border-[#638a63] shadow hover:shadow-md"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-bold text-[#223536]">{stock.ticker}</div>
                    <div className="text-xs text-[#a8ba86]">Precio: ${stock.price}</div>
                  </div>
                  <div className="text-[#46695a]">+${stock.change}</div>
                </div>
                <div className="text-xs text-[#638a63]">
                  +{stock.percentChange}% cambio
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-right">
            <button className="text-[#46695a] hover:text-[#223536] font-medium text-sm hover:underline">
              Ver todas las acciones → 
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccionesPeorRendimiento;
