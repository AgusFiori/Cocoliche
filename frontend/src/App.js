import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Admin from './pages/Admin.jsx';
import Home from './pages/Home.jsx'

function App() {
  const routes =
    <>
      <Route exact path="/" component={Home}></Route>
      <Route path="/admin" component={Admin}></Route>
    </>

  return (
    <>
      <Router>
        {routes}
      </Router>
    </>
  );
}

export default App;
