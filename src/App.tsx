import './App.css';
import { AllNews } from './components/AllNews';
import { Route, Routes } from "react-router-dom";
import { News } from './components/News';
import { NewsPage } from './components/NewsPage';

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path='/' element={<AllNews />} />
        <Route path='/news/:id' element={<NewsPage />} />
       </Routes>
    </div>
  );
}

export default App;
