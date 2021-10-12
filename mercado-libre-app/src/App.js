
import { useState } from 'react';
import './App.css';
import SearchAppBar from "./appbar/appBar";
import Catalogue from "./catalogue/catalogue";

function App() {
  const [criteria, setCriteria] = useState({
    term:"",
    filter:"none",
    sort:"relevance",
    
  });
  return (
    <>
      <SearchAppBar onCriteriaChange={e => setCriteria(e)} />
      <Catalogue term={criteria.term} filter={criteria.filter} sort={criteria.sort} />
    </>
  )
}

export default App;
