import "../styles/App.scss";
import getSentenceApi from "../services/api";
import {useEffect,useState} from 'react';


function App() {
  //variables de estado
  const [data, setData] = useState([]); // quito "quotes" y pongo un array vacío.
  const [search, setSearch] = useState('');
  const [filterCh, setfilterCh] = useState('All');
  const [newQuote, SetNewQuote] = useState ({
    quote:'',
    character: '',
    });
 

useEffect(() => {
    getSentenceApi().then((response) => {
      setData(response);
    });
  }, []);


  //funciones auxiliares para que se pinte el HTML
  const renderList = () => {
    return data
      .filter((eachQuote) => {
        return eachQuote.quote.toLowerCase().includes(search.toLowerCase()) 
      })
      .filter((eachQuote) => {
        if (filterCh !== "All") {
          return (eachQuote.character.toLowerCase()=== filterCh.toLowerCase()
      );
  } else{
    return eachQuote;
    }
  })
     .map((eachQuote, index) => (
        <li className="quote_item" key={index}>
          <p className="text">{eachQuote.quote}</p>
          <p className="textName">-{eachQuote.character}</p>
        </li>
      ));
  };

  //función que me permite modificar el input de filtrado
  const handleQuoteFilter = (ev) => {
    setSearch(ev.target.value);
  };

  const handleCharacter = (ev) => {
    setfilterCh(ev.target.value);
      };

  const hadleNewQuote = (ev) => {
    SetNewQuote({...newQuote, [ev.target.id]: ev.target.value}); 
} 
  

const handleClick = (ev) => {
    ev.preventDefault();
      setData([...data, newQuote]);
      SetNewQuote({ quote: '', character: '', });
}

  //HTML
  return (
    <div className="App">
      <header className="header">
      </header>  {/*<h1 className="tittle">Friends</h1>*/}
         <main>
        <form className="form">
          <label className="label" htmlFor="search">
            Filter by quote&nbsp;&nbsp;
            <input
              className="input"
              autoComplete="off"
              id="search"
              type="text"
              name="search"
              placeholder="quote"
              onInput={handleQuoteFilter}
              value={search}
            />
          </label>
          <label className="label" htmlFor="filter_character">  
            Filter by character&nbsp;&nbsp;
           <select className='character' id='filter_character' onChange={handleCharacter} value={filterCh}>
            <option value='All'>All</option>
            <option value='Monica'>Monica</option>
            <option value='Rachel'>Rachel</option>
            <option value='Phoebe'>Phoebe</option>
            <option value='Ross'>Ross</option>
            <option value='Chandler'>Chandler</option>
            <option value='Joey'>Joey</option>
            </select>
          </label>
        </form>        
      

      
        <ul className="quote_list">{renderList()}</ul>

        {/*nuevo formulario para añadir frase/personaje*/}
      <form className="new-quote">
          <h2>Add a new quote</h2>
          <label htmlFor="quote" className="new-quote__title"> Quote
          <input
            className="new-quote__input"
            type="text"
            name="quote"
            id="quote"
            placeholder="Quote"
            onInput={hadleNewQuote}
            value={newQuote.quote}
            />
          </label>
           <label htmlFor="character" className="new-quote__title"> Character
          <input
            className="new-quote__input"
            type="text"
            name="character"
            id="character"
            placeholder="Character"
            onInput={hadleNewQuote}
            value={newQuote.character}
            />
          <input
            className="new-quote_btn"
            type="submit"
            value="Add"
            onClick={handleClick}
           />
          </label>
          </form>
      </main>
    </div>
  );
}

export default App;
