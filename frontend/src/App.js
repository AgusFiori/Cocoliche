import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import Calendar from './pages/Calendar'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Menu from './pages/Menu'
import Profile from './pages/Profile'
import Management from './pages/Management'
import ScrollToTop from './components/ScrollTop'
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import authActions from './redux/actions/authActions'
import React, { useState } from 'react'

function App(props) {
  const [reload, setReload] = useState(false)
  if (props.loggedUser) {
    if (props.loggedUser.role === "admin") {
      console.log(1)
      var routes = 
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path ="/management" component={Management} />
          <Route exact path ="/calendar" component={Calendar} />
          <Route path="/cart" component={Cart} />
          <Route path="/menu" component={Menu} />
          <Route path="/contact" component={Contact} />
          <Route path="/profile" component={Profile}/>
          <Redirect to="/" />
        </Switch>
      </ScrollToTop>
    } else{
      console.log(2)
      var routes =
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path ="/calendar" component={Calendar} />
          <Route path="/cart" component={Cart} />
          <Route path="/menu" component={Menu} />
          <Route path="/contact" component={Contact} />
          <Route path="/profile" component={Profile}/>
          <Redirect to="/" />
        </Switch>
      </ScrollToTop>
    }
  } else if (localStorage.getItem('token')) {
    props.logFromLS(localStorage.getItem('token'))
      .then(respuesta => {
        if (respuesta === '/') setReload(!reload)
      })
  } else {
    var routes = (
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/cart" component={Cart} />
          <Route path="/menu" component={Menu} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect to="/" />
        </Switch>
      </ScrollToTop>
    );
  }

  return (
    <Router>
        {routes}
    </Router>
  );
}
const mapStateToProps = state => {
  return {
    loggedUser: state.authReducer.loggedUser
  }
}

const mapDispatchToProps = {
  logFromLS: authActions.logFromLS
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
