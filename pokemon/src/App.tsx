import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { InfoPokemon } from './pages/InfoPokemon';

function App() {
  return ( 
  <BrowserRouter >
    <Routes >
      <Route path="/" element={<Home />}/>
      <Route path="/info/:id" element={<InfoPokemon />}/>
    </Routes>
  </BrowserRouter> 
  )
}

export default App;
