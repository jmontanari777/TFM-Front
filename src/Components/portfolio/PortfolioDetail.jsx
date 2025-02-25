import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const PortfolioDetail = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Para controlar el estado del modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        portfolios: [
          {
            name: "Tecnologica",
            stocks: [
              { ticker: "TSLA", name: "Tesla Inc.", currentValue: 120 },
              { ticker: "AAPL", name: "Apple Inc.", currentValue: 344 },
              { ticker: "MSFT", name: "Microsoft Corporation", currentValue: 67 },
            ],
            history: [
              { date: "2025-02-01", value: 52000 },
              { date: "2025-02-02", value: 53100 },
            ],
          },
          // ... otros portfolios ...
        ],
      };

      setTimeout(() => {
        setPortfolioData(data);
        setSelectedPortfolio(data.portfolios[0]);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando carteras...</p>;
  if (!portfolioData) return <p>No se encontraron carteras.</p>;

  // Variables para los valores
  const totalValue = portfolioData.portfolios.reduce(
    (acc, portfolio) => acc + (portfolio.history?.length ? portfolio.history[portfolio.history.length - 1].value : 0),
    0
  );

  const latestValue = selectedPortfolio.history?.length
    ? selectedPortfolio.history[selectedPortfolio.history.length - 1].value
    : 0;

  const previousValue = selectedPortfolio.history?.length > 1
    ? selectedPortfolio.history[selectedPortfolio.history.length - 2].value
    : latestValue;

  const dailyChange = latestValue - previousValue;
  const dailyChangePercent = previousValue ? ((dailyChange / previousValue) * 100).toFixed(2) : "0.00";

  // Funciones de apertura y cierre del modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="relative h-screen bg-gray-100">

      {/* Botón para abrir el modal */}
      <button
        className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={openModal}
      >
        Abrir Modal
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full h-full p-6 flex flex-col justify-center items-center relative">
            {/* Título del Modal */}
            <h1 className="text-4xl font-bold mb-6">Ventana nueva</h1>

            {/* Botón de Cierre */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-xl bg-red-500 p-2 rounded-full"
            >
              X
            </button>

            {/* Contenido del Modal */}
            <p className="text-lg">Este es un modal que ocupa toda la pantalla.</p>

            {/* Aquí puedes agregar cualquier contenido adicional que quieras dentro del modal */}
            <div className="w-full h-full mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedPortfolio.history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Gestión de Carteras</h2>

          <button onClick={() => navigate('/')} className="bg-red-500 text-white px-4 py-2 rounded">
  Volver
</button>


        </div>

        <div className="mb-6 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-bold">Valor Total de Cartera: ${totalValue}</h3>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Histórico de la Cartera</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={selectedPortfolio.history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-bold">Valor Actual: ${latestValue}</h3>
          <p className={`text-lg ${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Variación del día: ${dailyChange} ({dailyChangePercent}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
