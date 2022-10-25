// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Main from "./pages/Main"
import Home from './pages/Home';
import Administration from './pages/Administration'
import Examination from './pages/Examination'
import Login from './pages/Login';
// import SignUp from './pages/SignUp';
import Payment from './pages/Payment';
import Chart from './pages/Chart'
import SignUp from './pages/SignUp';
import Users from './_api/TestMD';
import Reception from './pages/Reception';
import Test from './pages/_testapp'
import PatientList from './components/PatientList/PatientList';
import Clock from './Clock/Clock';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<Home/>}></Route>
            <Route path="/administration/*" element={<Administration />}></Route>
            <Route path="/examination/*" element={<Examination />}></Route>
            <Route path="/payment/*" element={<Payment />}></Route>
            <Route path="/chart/*" element={<Chart />}></Route>
            <Route path="/login/*" element={<Login />}></Route>
            <Route path="/signup/*" element={<SignUp />}></Route>
            <Route path="/users/*" element={<Users />}></Route>
            <Route path="/reception/*" element={<Reception />}></Route>

        </Routes>   
    </BrowserRouter>
  </div>
  
  // <Examination />

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


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
