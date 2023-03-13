import "../styles/App.scss";
import quotes from "../data/api.json";
import {useEffect, useState} from 'react';

function App() {
  //variables de estado
  const [data, setData] = useState(quotes);
  const [search, setSearch] = useState('');
  const [filterCh, setfilterCh] = useState('');
  const [newQuote, SetnewQuote] = useState ({
    quote:'',
    character: '',
    });

  //funciones auxiliares para que se pinte el HTML
  const renderList = () => {
    return data
      .filter((eachQuote) => {
        return eachQuote.quote.toLowerCase().includes(search.toLowerCase()) 
      })
      .filter((eachQuote) => {
        return eachQuote.character.toLowerCase().includes(filterCh.toLowerCase()) 
      })
      .map((eachQuote, index) => (
        <li className="quote_item" key={index}>
          <p> Quote: {eachQuote.quote}</p>
          <p>Character: {eachQuote.character}</p>
        </li>
      ));
  };

  //función que me permite modificar el input de filtrado
  const handleQuoteFilter = (ev) => {
    setSearch(ev.target.value);
  };

  const handleCharacter = (ev) => {
   if (ev.target.value==="Todos")
    {
      setfilterCh('');
    }
    else{
      setfilterCh (ev.target.value);
    }
  };

  const hadleNewQuote = (ev) => {
    SetnewQuote({...newQuote, [ev.target.id]: ev.target.value}); 
} 
  

const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newQuote]);
    SetnewQuote({ quote: '', character: '', });
  };

  //HTML
  return (
    <div className="App">
      <header>
        <h1 className="tittle">Friends</h1>
        <form>
          <label className="label" htmlFor="search">
            filter by quote
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
          <label className="label" htmlFor="filter_character"  value={filterCh} onChange={handleCharacter}>
            filter by character
           <select className='character' id='filter_character'>
            <option>All</option>
            <option>Monica</option>
            <option>Rachel</option>
            <option>Phoebe</option>
            <option>Ross</option>
            <option>Chandler</option>
            <option>Joey</option>
            </select>
          </label>
        </form>
                  
      </header>

      <main>
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
