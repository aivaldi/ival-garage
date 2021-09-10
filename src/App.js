import React from 'react';
import { Route, Switch, Redirect, BrowserRouter  } from 'react-router-dom';
import { Admin, Login, Main } from "./pages/pages";
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

  return (
    <Route  { ...{exact, path}}
      render = { (props)=>{
        return <Component { ...{...props, ...rest}}  />
      }}
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
            <PublicRoute exact path="/" component={Main}></PublicRoute>
            <PublicRoute exact path="/login" component={Login} ></PublicRoute>
            <PrivateRoute exact path="/admin" component={Admin}></PrivateRoute>
          </Switch>
      </BrowserRouter >
    </Loader>
  
  
  );
}

export default App;
