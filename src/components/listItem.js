import React from 'react'
import { Item } from './item'


export const ListItem = ({elements}) =>{

    return (
        <>
<div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        { 
            elements.map( 
                (el)=> <Item {...el} ></Item>
            )
        }
      

</div>
</>
    )

}