const getSentenceApi = () => {
  // llamo la API
  return fetch(
    "https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json"
  )
    .then((response) => response.json())
    .then((response) => {
      // cuando responde, limpio datos
      return response;
    });
};

// Exportamos el objeto para que pueda ser usado desde App
export default getSentenceApi;