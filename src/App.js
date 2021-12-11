import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import ServiceDetails from './components/ServiceDetails/ServiceDetails';
import Services from './components/Services/Services';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Services/>}></Route>
          <Route path='/data/:id' element={<ServiceDetails/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
