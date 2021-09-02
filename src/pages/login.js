import React,{useState} from 'react'
import { auth } from "../services/firebase";
import firebase from 'firebase';
import {  useHistory } from "react-router-dom";
import { useLoader } from '../components/loader';

export const Login = () =>{
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);
    
    const [Loader, setLoading] = useLoader();
    
    const handleSubmit = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
            return;
            }
            
            const {email, password} ={  email: event.target.email.value, password:event.target.password.value   };
            setLoading(true)
            auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
                auth().signInWithEmailAndPassword(email, password ).then( (res) =>{
                    history.push("/")
                    } ).catch( 
                      (err) =>{
                        setErrorMessage(err.message);
                      }
                    ).finally(()=>setLoading(false))
            })
            
        }
 
        const localStyle = { transition: 'all 0.15s ease 0s' }
        return ( 
            <Loader>
            <div className="flex flex-col items-center justify-center bg-gray-300 h-screen select-none">
                <div className="flex flex-col -mt-32 bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl shadow-2xl w-full max-w-md  border-l-4 border-purple-600">
                    <div className="font-medium self-center text-xl sm:text-2xl uppercase w-60 text-center bg-purple-600 shadow-2xl p-6 rounded-full text-white">Venta de Garage</div>
                        <div className="mt-10">
                        <form  onSubmit={handleSubmit}>                
                            <div className="relative w-full mb-3">
                                <input required type="email" name="email" className="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Email" style={localStyle} />
                               
                            </div>
                            <div className="relative w-full mb-3">
                                <input required type="password" name="password" className="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Password" style={localStyle} />
                               
                            </div>
                            {errorMessage &&
                            <div className="mt-2 border border-red-200 items-center bg-white leading-none text-red-600 rounded-full p-2 shadow text-teal text-sm">
                                <span className="inline-flex px-2">{errorMessage}</span>
                            </div>
                            }
                            <div className="text-center mt-6">
                                <input type="submit" name="signin" id="signin" value="Entrar" className="p-3 rounded-lg bg-purple-600 outline-none text-white shadow w-32 justify-center focus:bg-purple-700 hover:bg-purple-500" />
                            </div>  
                            <div className="flex flex-wrap mt-6">
                                <div className="w-1/2 text-left">
                                    <a href="#" className="text-blue-900 text-xl"><small>Recuperar password</small></a>
                                </div>
                                <div className="w-1/2 text-right">
                                    <a href="signup" className="text-blue-900 text-xl"><small>Registrarse</small></a>
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        </div>
        </Loader>)

}