import React from 'react'
import { ItemInput } from './form/itemInput'
import {ItemContainer} from './form/itemContainer'

export const ItemFilter = ({user, categories,onFilter, onSearch}) =>{
    
    return (
<>
                    <div className="flex flex-col sm:flex-col sm:mt-8 w-screen sm:w-full">
                        
                            <ItemContainer>
                                <ItemInput label="Buscar" placeholder="Elemento a buscar" onChange={(e)=>onSearch(e.currentTarget.value)} >
                                </ItemInput>
                            </ItemContainer>
                        
                        <div className="flex border-solid  flex-row items-center px-1 py-3 mr-3 justify-between text-xs cursor-pointer" onClick={()=>onFilter(null)}>
                            <span className={"font-bold"} >Categorias</span>
                            <span
                                className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full "
                            >{categories.length}</span>
                        </div>
                        <div className="flex flex-row sm:flex-col pl-8" >
                            { categories.map( (e, idx)=>{
                                    return (
                                        <div key={idx} onClick={()=>onFilter(e.name)}
                                            className="h-8 cursor-pointer flex flex-row justify-between bg-blue-700 hover:bg-blue-800 leading-none ml-1 text-xs text-sm  sm:px-4 py-2  border rounded-full"
                                        >
                                            <div className="cursor-pointer text-white sm:ml-2 sm:px-0 px-2 text-sm font-semibold" > {e.name}</div>
                                            <span
                                                className="flex items-center justify-center bg-gray-300  rounded-full text-black text-xs p-2 hidden sm:flex"
                                            >{e.size}</span>
                                        </div>
                                    )    
                            } ) }
                            
                            
                        </div>
                    </div>
</>

    )

}

export const MemorizedItemFilter = React.memo(ItemFilter);