import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import {auth} from '../services/firebase'
export const UserData = () =>{
    const [displayName, setDisplayName] = useState("");

    auth().onAuthStateChanged(function(user) {
        setDisplayName(user.displayName.toUpperCase())
      });

    const history = useHistory()
    const logout = ()=>{
        auth().signOut().then( ()=>{
            history.push("/")
        });
        
    }

return (
    <>
                    <div className="flex flex-row items-center justify-center h-12 w-full">
                        <div className="ml-2 font-bold text-2xl">Venta de Garage</div>
                    </div>
                    <div
                        className="flex flex-col items-center bg-blue-600  border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
                    >
                        <div  class="text-white text-sm px-4 py-2 ">
                                    {displayName}
                        </div>
                        <div className="flex flex-row items-center mt-3">
                            <div onClick={logout} className="text-white bg-blue-700 hover:bg-blue-800 leading-none ml-1 text-xs text-sm px-4 py-2  border rounded-full">Logout</div>
                        </div>
                    </div>
                    </>

)

}