import React from 'react';
import { Route, Switch, Redirect, BrowserRouter  } from 'react-router-dom';
import { Signup, Login, Main } from "./pages/pages";
import "./services/firebase"
import firebase from 'firebase';
import { useLoader } from './components/loader';

const PrivateRoute = ({component:Component,...rest}) => {
  const user = firebase.auth().currentUser;

  return (
    <Route {...rest}
      render = { (props)=>{

        
        return user? <Component {...props} />:
        <Redirect to={ { pathname:'/login', state:{ from:props.location } } }></Redirect>

      } }
    >     
    </Route>
  );

}


const PublicRoute = ({component:Component,exact, path, ...rest}) => {
  const user = firebase.auth().currentUser;

  return (
    <Route  { ...{exact, path}}
      render = { (props)=>{
      return !user? <Component { ...{...props, ...rest}}  />:
        <Redirect to={ { pathname:'/main'} }></Redirect>
      } }
    >     
    </Route>
  );

}

function App() {
  const [Loader, setLoading] = useLoader(true);
  firebase.auth().onAuthStateChanged(function(user) {
    setLoading(false)
  });

  return (
    <Loader>
      <BrowserRouter >
          <Switch>
            <PublicRoute exact path="/" component={Login}></PublicRoute>
            <PublicRoute exact path="/login" component={Login} ></PublicRoute>
            <PrivateRoute exact path="/main" component={Main}></PrivateRoute>
            <PublicRoute exact path="/signup" component={Signup}></PublicRoute>
          </Switch>
      </BrowserRouter >
    </Loader>
  
  
  );
}

export default App;
