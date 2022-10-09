import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import routes,{renderRoutes} from './routes';

function App() {

 return (

    <>
   
       <Router>{renderRoutes(routes)}</Router>
</>
  );
}

export default App;
    