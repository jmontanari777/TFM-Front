//En este componente, se grafica el modelo de cajas en la landing Page
//5 Columnas x 3 Filas
//

import Indices from '../indices/Indices';
import StockIndicesDashboard  from '../grafico/StockIndicesDashboard';
import FinancialNews  from '../noticias/FinancialNews';
import InsertNews  from '../noticias/InsertNews';
import Noticias  from '../noticias/Noticias';
import AnalisisAcciones  from '../noticias/AnalisisAcciones';
import AccionesMejorRendimiento  from '../noticias/AccionesMejorRendimiento';
import AccionesPeorRendimiento  from '../noticias/AccionesPeorRendimiento';


import Animacion from './Animacion';

const TradingDashboard = () => {


  return (
    <div className="min-h-screen flex flex-col">

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Primera fila de cajas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div className="p-4 rounded-lg shadow-lg flex flex-col md:col-span-1 col-span-1 w-full h-[520px] overflow-hidden" style={{ backgroundColor: '#a8ba86' }}>
            <Indices />
          </div>
          <div className="bg-blue-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[520px]  " style={{ backgroundColor: '#fafafa' }}>
            <StockIndicesDashboard />
          </div>
          <div className="bg-blue-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[520px]  " style={{ backgroundColor: '#a8ba86' }}>
            <Noticias />
          </div>
        </div>

        {/* Segunda fila de cajas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="bg-purple-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-[255px]" style={{ backgroundColor: '#213435' }}>
 
           <Animacion />

          </div>

          <div className="bg-blue-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[250px]  " style={{ backgroundColor: '#a8ba86' }}>
          
           <AnalisisAcciones />
          
          </div>

          <div className="bg-teal-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1" style={{ backgroundColor: '#a8ba86' }}>
          
           <FinancialNews />
          
          </div>

          <div className="relative p-8 rounded-lg shadow-lg col-span-1" style={{ backgroundColor: '#a8ba86' }}>
               
           <InsertNews />
                               
          </div>
        </div>

        {/* Tercera fila de cajas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-cyan-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-[360px]" style={{ backgroundColor: '#a8ba86' }}>
            
            <AccionesMejorRendimiento/>

          </div>
          <div className="bg-lime-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 h-[360px]" style={{ backgroundColor: '#a8ba86' }}>
            
            <AccionesPeorRendimiento/>

          </div>
          <div className="bg-emerald-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1" style={{ backgroundColor: '#a8ba86' }}>
            <span className="text-white text-lg font-bold">Caja 13</span>
          </div>
          <div className="bg-gray-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1" style={{ backgroundColor: '#a8ba86' }}>
            <span className="text-white text-lg font-bold">Caja 14</span>
          </div>
          <div className="bg-blue-800 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1" style={{ backgroundColor: '#a8ba86' }}>
            <span className="text-white text-lg font-bold">Caja 15</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Copyright © 2025 - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default TradingDashboard;
