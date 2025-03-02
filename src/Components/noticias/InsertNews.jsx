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
                    tickers: ["TSM"],
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
                    titulo: "Meta introduce realidad aumentada en Facebook",
                    descripcion: "Facebook ahora incluirá funciones avanzadas de AR.",
                    tickers: ["INTC"],
                    fuente: "TechCrunch",
                    importancia: "baja",
                    url: "https://www.techcrunch.com/meta-ar",
                  })
             }>Noticia 4</button>
             <p>Meta</p>
          </div>
        
    </div>  
    
  );
 
}
