import React from 'react'
import { Item } from './item'


const ListItemInternal = ({elements, onEdit, onDelete}) =>{
    return (
        <>
<div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        { 
        
            elements.map( 
                (el)=> <Item  onDelete={onDelete} onEdit = {onEdit} key={el.elementKey} {...el} ></Item>
            )
        }
      

</div>
</>
    )

}

export const ListItem =React.memo(ListItemInternal)