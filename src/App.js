// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Main from "./pages/Main"
import Home from './pages/Home';
import Administration from './pages/Administration/Administration';
import Examination from './pages/Examination/Examination'
import Login from './pages/Signin/Signin';
import Payment from './pages/Payment/Payment';
import Chart from './pages/Chart/Chart';
import SignUp from './pages/Signup/SignUp';
import Reception from './pages/Reception/Reception';


function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home/>}></Route>
        <Route path="/administration/*" element={<Administration />}></Route>
        <Route path="/examination/*" element={<Examination />}></Route>
        <Route path="/payment/:pid" element={<Payment />}></Route>
        <Route path="/chart/:pid" element={<Chart />}></Route>
        <Route path="/login/*" element={<Login />}></Route>
        <Route path="/signup/*" element={<SignUp />}></Route>
        <Route path="/reception/:pid" element={<Reception />}></Route>
        
      </Routes>   
    </BrowserRouter>
  </div>
  
    ///////////////////////////////////////////////////////////////////

    // <div className='App'>
    //   <div className='container'>
    //     <Home />
    //     <div className='others'>other pages</div>
    //   </div>
    // </div>

    // <Router>
    //   <Switch>
    //     <Route path="/"> <Main/> </Route>
    //   </Switch>
    // </Router>
  )
}

export default App;
