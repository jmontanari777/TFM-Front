import React, { useEffect, useState } from "react";
import { subscribeToNews, unsubscribeFromNews } from "../../socket";

const Noti = () => {
    const [noticias, setNoticias] = useState([]);
    const [noticiaModal, setNoticiaModal] = useState(null); // Estado para el modal
  
    useEffect(() => {
      // Suscribirse a las noticias financieras
      subscribeToNews((newNews) => {
        setNoticias((prevNoticias) => [newNews, ...prevNoticias]); // Agrega la noticia a la lista
        setNoticiaModal(newNews); // Muestra la noticia en el modal
      });
  
      return () => {
        unsubscribeFromNews(); // Desuscribirse al desmontar el componente
      };
    }, []);
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Últimas Noticias Financieras</h2>
        
        <ul className="space-y-4">
          {noticias.map((noticia) => (
            <li key={noticia.newsId} className="border p-4 rounded shadow">
              <strong>{noticia.title}</strong> - <span className="text-sm">{noticia.importance}</span>
              <br />
              <a
                href={noticia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Leer más
              </a>
            </li>
          ))}
        </ul>
  
        {/* Modal */}
        {noticiaModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-bold">{noticiaModal.title}</h3>
              <p className="mt-2">{noticiaModal.importance}</p>
              <a
                href={noticiaModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Leer más
              </a>
              <button
                className="mt-4 w-full bg-red-500 text-white py-2 rounded"
                onClick={() => setNoticiaModal(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  

export default Noti;
