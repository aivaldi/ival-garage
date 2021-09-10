import React from 'react'

export const ItemInput = ({label, name, placeholder, required, actions, ...rest})=>{

    return (
        <>
            <span className="flex justify-between">
                <label className="block text-xs font-semibold text-gray-600 uppercase">{label}</label>
                {actions &&  actions }
            </span>
            <input key={'searchText'} type="text" name={name} placeholder={placeholder}  className="block w-full p-2 mb-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required={required} {...rest} />
        </>
    )
}