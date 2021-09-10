import "../index.css";
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import firebase from 'firebase'
import { auth } from "../services/firebase";
import { useLoader } from "../components/loader";



export const Signup = ()=>{
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordMissmatch, setPasswordMissmatch] = useState(false);
  const history = useHistory();
  const [Loader, setLoading] = useLoader();
  
  const handleSubmit = (event) => {
    
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }
    
    const {email, password, passwordConfirm, userName, userLastname} =  {  
      email: event.target.email.value, 
      password:event.target.password.value,
      passwordConfirm:event.target.passwordConfirm.value,
      userName:event.target.firstname.value,
      userLastname:event.target.lastname.value    };
    
    if (password!==passwordConfirm){
      setPasswordMissmatch(true);
      return;
    }
    setPasswordMissmatch(false);
    setLoading(true);
    
    
    
    auth().createUserWithEmailAndPassword( email, password )
        .then( (res) =>{
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: `${userName} ${userLastname}`  ,
          }).then(() => {
            // Update successful
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });  

          history.push("/login")
        } )
        .catch( 
          (err) =>{
            setLoading(false);
            setErrorMessage(err.message);
            console.log(err)
          }
        )
    
  };
  const backToLogin = () =>{
    history.push("/login")
  }
  return (
    <Loader>
    <div className="flex flex-col items-center justify-center bg-gray-300 h-screen select-none">
      <div className="flex flex-col -mt-32 bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl shadow-2xl w-full max-w-md  border-l-4 border-purple-600">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase w-60 text-center bg-purple-600 shadow-2xl p-6 rounded-full text-white">Venta de Garage</div>
              <div className="mt-10">
                <form  className="mt-6" onSubmit={handleSubmit}>
                  <div className="flex justify-between gap-3">
                    <span className="w-1/2">
                      <label className="block text-xs font-semibold text-gray-600 uppercase">Nombre</label>
                      <input id="firstname" type="text" name="firstname" placeholder="Juan"  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                    </span>
                    <span className="w-1/2">
                      <label  className="block text-xs font-semibold text-gray-600 uppercase">Apellido</label>
                    <input id="lastname" type="text" name="lastname" placeholder="Perez"  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                    </span>
                  </div>
                  <label  className="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                  <input id="email" type="email" name="email" placeholder="juan.perez@zaraza.com"  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                  <label  className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                  <input id="password" type="password" name="password" placeholder="********"  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                  <label  className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Confirmar password</label>
                  <input id="passwordConfirm" type="password" name="passwordConfirm" placeholder="********"  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                  { passwordMissmatch &&    (<small className="p-2 text-red-500">* Los passwords deben ser iguales</small>) }
                  
                  {errorMessage &&
                  <div className="mt-2 border border-red-200 items-center bg-white leading-none text-red-600 rounded-full p-2 shadow text-teal text-sm">
                    <span className="inline-flex px-2">{errorMessage}</span>
                  </div>
                  }

                  <button type="submit" className="w-full py-3 mt-2 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                    Registrarse
                  </button>
                  
                  <p onClick={backToLogin} className="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">Ya estas registrado?</p>
                </form>
              </div>
            </div>
          </div>
      </Loader>
    /*
  <Section>
    <Card>
      <Card.Title class="text-center"><h1>Welcome  to<br />Ivalchat ;) </h1></Card.Title>
      <Card.Body>
        <Card.Text>
          <Row >
            <Col md={{ span: 8, offset: 2 }}>
              <Form noValidate validated={validated} onSubmit={handleSubmit} onChange={ (e)=>setValidated(e.currentTarget.checkValidity()) } >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control required type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please choose a email.
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" placeholder="Password" />
                  <Form.Control.Feedback type="invalid">
                    Please insert password.
                </Form.Control.Feedback>
                </Form.Group>
                <Button disabled={!validated} variant="primary" type="submit">
                  Register
                </Button>
                <Button variant={"link"} onClick={ ()=>history.push("/login") }>
                  Back to login
                </Button>
              </Form>
            </Col>
          </Row>
          <br></br>
          {errorMessage && (
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <Alert variant={"danger"}>
                  {errorMessage}
                </Alert>
              </Col>
            </Row>
          )}
      </Card.Text>
      </Card.Body>
    </Card>
  </Section>*/
)
  }