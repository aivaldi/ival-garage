import React from 'react'

export const ItemContainer = ({children})=>{
    return (
        <>
                {children}
        </>
    )
}

export const MultipleItemContainer = ({children})=>{
    return ( 
        <div className="flex justify-between gap-3">
        
        {children.map ( (e,idx)=>{ return ( <span key={idx} className="w-1/2">{e}</span> )  })  }
        </div>
    )
}


export const ButtonContainer = ({children})=>{
    return ( 
        <div className="flex justify-between gap-3 pt-3">
        
        {children.map ( (e,idx)=>{ return ( <span key={idx} >{e}</span> )  })  }
        </div>
    )
}

export const FormContainer = ({children, title}) =>{
    return (
        
            <div className="flex flex-col -mt-32 bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl shadow-2xl w-full max-w-md  border-l-4 border-purple-600">
                <div className="font-medium self-center text-xl sm:text-2xl uppercase w-60 text-center bg-purple-600 shadow-2xl p-6 rounded-full text-white">
                    {title}
                </div>
                <div className="mt-10">
                    {children}
                </div>
            </div>
        

    )
}