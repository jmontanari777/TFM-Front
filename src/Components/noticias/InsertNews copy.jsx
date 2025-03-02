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
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Insertar Noticias</h2>
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() =>
          insertNews({
            titulo: "Apple y Tesla anuncian alianza en IA",
            descripcion: "Las compañías unirán fuerzas en el desarrollo de inteligencia artificial.",
            tickers: ["AAPL", "TSLA"],
            fuente: "CNBC",
            importancia: "alta",
            url: "https://www.cnbc.com/apple-tesla-ai",
          })
        }
      >
        Insertar Noticia 1
      </button>

      <button
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        onClick={() =>
          insertNews({
            titulo: "Microsoft adquiere OpenAI",
            descripcion: "Microsoft confirma la compra de OpenAI por 20 mil millones.",
            tickers: ["MSFT", "GOOGL"],
            fuente: "The Verge",
            importancia: "ultimo momento",
            url: "https://www.theverge.com/microsoft-openai",
          })
        }
      >
        Insertar Noticia 2
      </button>

      <button
        className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
        onClick={() =>
          insertNews({
            titulo: "Amazon lanza su primer coche eléctrico",
            descripcion: "El nuevo vehículo competirá con Tesla en el mercado de EVs.",
            tickers: ["AMZN", "TSLA"],
            fuente: "Bloomberg",
            importancia: "media",
            url: "https://www.bloomberg.com/amazon-car",
          })
        }
      >
        Insertar Noticia 3
      </button>

      <button
        className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        onClick={() =>
          insertNews({
            titulo: "Meta introduce realidad aumentada en Facebook",
            descripcion: "Facebook ahora incluirá funciones avanzadas de AR.",
            tickers: ["META"],
            fuente: "TechCrunch",
            importancia: "baja",
            url: "https://www.techcrunch.com/meta-ar",
          })
        }
      >
        Insertar Noticia 4
      </button>

      {status && <p className="text-gray-700 mt-4">{status}</p>}
    </div>
  );
}
