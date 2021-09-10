import React, {useState} from "react";
import { Button } from "./button";

export const PopUp = (props) => {
    return (
        <div className="absolute w-full flex items-center justify-center h-screen bg-opacity-75 bg-gray-300">
            <div className="holder mx-auto w-1/5">
            <div className="bg-white rounded-tl-lg rounded-tr-lg shadow-md p-4 border-1 border-gray-400 bg-blue-600 text-white">
                <h4>{props.title }</h4></div>
                <div className="bg-white rounded-bl-lg rounded-br-lg shadow-md p-4 border-1 border-gray-400  mb-8">
                    <div className="relative">
                        <p className="block mb-1 text-gray-900 leading-tight mb-4">
                        {props.message }
                        </p>
                        <div className="block flex justify-between w-full pl-4 pr-4">
                        <Button onClick = {()=>props.callback() } >SI</Button>
                        <Button onClick={()=>props.cancel() } alternate={"true"} >No</Button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export const usePopUp = (props) =>{
    const [isVisible, setIsVisible] = useState(false)

    const toggle = ()=> setIsVisible((prop)=>!prop);
    
    const Component = ({isVisible, ...props})=> isVisible?<PopUp cancel={ ()=>toggle() } {...props}></PopUp>:<></>

    return {
        isVisible,
        toggle,
        Component:()=> <Component isVisible={isVisible} {...props}></Component>
    }


}