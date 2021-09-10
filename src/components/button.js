import React from 'react';

export const Button = ({children,...props}) =>{

    const colorBase = props.alternate? 'red': 'blue';
    const className = `rounded-lg bg-${colorBase}-600 outline-none text-white shadow pl-2 pr-2 justify-center hover:bg-${colorBase}-500`

    return <button className={className} {...props}>{children}</button>
}