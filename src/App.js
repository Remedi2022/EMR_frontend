// import logo from './logo.svg';
import './App.css';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from './pages/Home';
import Examination from './pages/Examination'
// import Administration from './pages/Administration'


function App() {
  return (
    <Examination />
    
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
