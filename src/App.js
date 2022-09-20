// import logo from './logo.svg';
import './App.css';
// import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Main from "./pages/Main"
import Home from './pages/Home';
import Administration from './pages/Administration'
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (


    <div className='App'>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/administration/*" element={<Administration />}></Route>

        {/* <Route path="/" component={ Home } />
        <Route path="/administration" component={ Administration } />   */}
      </Routes>
      
    </BrowserRouter>
  </div>


    // <Home />
    // <Login />
    // <Register />
    // <Administration />
    
    
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
