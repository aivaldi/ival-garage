import React,{useState} from 'react'
import DatePicker  from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

export const ItemDate = ({label, name, required, actions, onChange})=>{
    const [startDate, setStartDate] = useState(new Date());
    const handleChange = (date)=>{
        setStartDate(date)
        onChange({
            currentTarget:{ value:date, name }
        });
    }
    const handleClean = (evt)=>{ 
        evt.stopPropagation();
        evt.preventDefault();
        handleChange("")
    }
    return (
        <>
            <span className="flex justify-between">
                <label className="block text-xs font-semibold text-gray-600 uppercase">{label}</label>
                
            </span>
            <span className="flex justify-between">
            <DatePicker selected={startDate} onChange={handleChange} />
            <span className="cursor-pointer" onClick={handleClean}>Inmediata</span>
            </span>
            <input type="hidden" name={name} value={startDate} required={required}></input>
        </>
    )
}