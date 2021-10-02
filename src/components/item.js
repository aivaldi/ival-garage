import React,{useMemo} from 'react'
import { Button } from './button';
export const Item = ({ elementKey,id,img,shortDescription, description,category, price,date, onDelete, onEdit }) =>{

const [intValue,decimalValue] = (price && price!=="")? price.toString().split("."):"";
const scapedInitialValue = useMemo(() => intValue.split('').reverse().reduce( (acc,val)=> (acc.replaceAll(".","").length%3===0)? `${val}${acc}`:`${val}${acc}`) , [intValue])
const formatter = useMemo(()=>new Intl.DateTimeFormat("es"),[]);
const currentDate = useMemo(()=>new Date(date),[date]);

return (

<div className="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative" style={ {overflowWrap: "break-word"}}>
  <img className="w-full h-25" src={img?img:"/img/no-image.png"} alt="" />
  <div className="badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">Sale</div>
  <a rel="noopener noreferrer" target="_blank" href={`https://wa.me/5491166407694?text=Hola Micaela, estoy interesado en ${shortDescription}`}>
    <div className="info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300">
      <span className="mr-1 p-1 px-2 font-bold"> Mandame un mensaje por Whatsapp</span>
      
    </div>
  </a>
  <div className="desc p-4 text-gray-800">
    <div  className="title font-bold block cursor-pointer">{shortDescription}</div>
    <div  className="badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer">{category}</div>
    <span className="text-xs">{ date ? "Entrega no antes del " + formatter.format(currentDate): "Entrega inmediata" }</span>
    <span className="description text-sm block py-2 border-gray-400 mb-2">{description}</span> 
    
    <p className="text-5xl font-bold text-center group-hover:text-white text-blue-500">
                ${scapedInitialValue}.<span className="text-3xl">{decimalValue || "00"}</span>
    </p>
     
    
    
    { (onDelete||onEdit) && 
    <div className="flex justify-between">
        {onEdit && <Button onClick={()=>onEdit(elementKey)}>Editar</Button> }
        {onDelete && <Button onClick={()=>onDelete(elementKey)} alternate={"true"}>Borrar</Button> }
    </div>
    }
  </div>
</div>



)

}