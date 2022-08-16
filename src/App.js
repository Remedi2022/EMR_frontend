// import logo from './logo.svg';
import './App.css';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Main from "./pages/Main"
import LeftNav from './components/LeftNav/LeftNav';
import Home from './pages/Home';

function App() {
  return (
    <Home />
    
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
