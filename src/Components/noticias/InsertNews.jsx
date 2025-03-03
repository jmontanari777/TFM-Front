import { useState } from "react";
import axios from "axios";

export default function InsertNews() {
  const [status, setStatus] = useState("");

  const insertNews = async (newsData) => {
    try {
      const response = await axios.post("http://localhost:3000/noticias", newsData);
      setStatus(`✅ Noticia insertada: ${response.data.titulo}`);
    } catch (error) {
      setStatus("❌ Error al insertar la noticia");
      console.error(error);
    }
  };

  return (
    <div >
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center">
             <button className="btn" 
              style={{ backgroundColor: '#e1e3ac', color: '#223536' }} 
              onClick={() => 
                insertNews({
                    titulo: "Apple y Tesla anuncian alianza en IA",
                    descripcion: "Las compañías unirán fuerzas en el desarrollo de inteligencia artificial.",
                    tickers: ["AAPL", "TSLA"],
                    fuente: "CNBC",
                    importancia: "alta",
                    url: "https://www.cnbc.com/apple-tesla-ai",
                })  
                }>Noticia 1
              </button>
             <p>Apple - Tesla</p>
        </div>

          <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-center">
             <button className="btn" 
             style={{ backgroundColor: '#638a63', color: '#e1e3ac' }} 
             onClick={() => 
                insertNews({
                    titulo: "Microsoft adquiere OpenAI",
                    descripcion: "Microsoft confirma la compra de OpenAI por 20 mil millones.",
                    tickers: ["MSFT", "GOOGL"],
                    fuente: "The Verge",
                    importancia: "ultimo momento",
                    url: "https://www.theverge.com/microsoft-openai",
                  })                
             }>Noticia 2</button>
             <p>Micr Goog</p>
          </div>
          <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center">
             <button className="btn" 
             style={{ backgroundColor: '#46695a', color: '#e1e3ac' }} 
             onClick={() => 
                insertNews({
                    titulo: "Amazon lanza su primer coche eléctrico",
                    descripcion: "El nuevo vehículo competirá con Tesla en el mercado de EVs.",
                    tickers: ["AMZN"],
                    fuente: "Bloomberg",
                    importancia: "media",
                    url: "https://www.bloomberg.com/amazon-car",
                  })
             }>Noticia 3</button>
             <p>Tesla - Amazon</p>
          </div>
          <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-center">
             <button className="btn" 
             style={{ backgroundColor: '#223536', color: '#e1e3ac' }} 
             onClick={() => 
                insertNews({
                    titulo: "Intel amplía la línea Xeon 6 con CPUs de núcleos de alto rendimiento",
                    descripcion: "Intel Corporation (NASDAQ:INTC), un actor destacado en la industria de semiconductores con una capitalización de mercado de 104.000 millones de dólares y unos ingresos anuales de 53.100 millones de dólares, ha ampliado su familia de procesadores Xeon 6, introduciendo nuevas CPUs con núcleos de alto rendimiento",
                    tickers: ["INTC"],
                    fuente: "Investing",
                    importancia: "baja",
                    url: "https://es.investing.com/news/company-news/intel-amplia-la-linea-xeon-6-con-cpus-de-nucleos-de-alto-rendimiento-93CH-3028337",
                  })
             }>Noticia 4</button>
             <p>Intel</p>
          </div>
        
    </div>  
    
  );
 
}
