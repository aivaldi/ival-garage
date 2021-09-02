import React from 'react'

export const ItemFilter = ({categories,onFilter}) =>{

    return (
<>
<div className="flex flex-col mt-8">
                        <div className="flex flex-row items-center justify-between text-xs">
                            <span className="font-bold">Categorias</span>
                            <span
                                className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                            >{categories.length}</span>
                        </div>
                        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                            { categories.map( (e)=>{
                                    return (
                                        <div
                                            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                        >
                                            <div onClick={()=>onFilter(e)} className="cursor-pointer  ml-2 text-sm font-semibold"> {e}</div>
                                        </div>
                                    )    
                            } ) }
                            
                            
                        </div>
                    </div>
</>

    )

}