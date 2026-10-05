import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import ManageExpense from './components/ManageExpense';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/add-expense' element={<AddExpense/>}></Route>
          <Route path='/manage-expense' element={<ManageExpense/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
