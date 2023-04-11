
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Register from "./Components/Register";
import Login from "./Components/Login";
import UsersTable from './Components/UsersTable'
function App() {
    return (
      <div className="App container">
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Register/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/table' element={<UsersTable/>} />

          </Routes>
        </BrowserRouter>

      </div>
  );
}

export default App;
