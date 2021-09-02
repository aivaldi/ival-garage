import React from 'react'
export const Item = ({ img,shortDescription, description,category, price }) =>{

const [intValue,decimalValue] = price.toString().split(".")
return (

<div className="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative">
  <img className="w-full" src={img} alt="" />
  <div className="badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">Sale</div>
  <div className="info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300">
    {/*<span className="mr-1 p-1 px-2 font-bold">105 Watching</span>
    <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">105 Likes</span>
    <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">105 Dislikes</span>*/}
  </div>
  <div className="desc p-4 text-gray-800">
    <div  target="_new" className="title font-bold block cursor-pointer hover:underline">{shortDescription}</div>
    <div  target="_new" className="badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer">{category}</div>
    <span className="description text-sm block py-2 border-gray-400 mb-2">{description}</span>
    <p class="text-5xl font-bold text-center group-hover:text-white text-blue-500">
                ${intValue}.<span class="text-3xl">{decimalValue}</span>
    </p>
  </div>
</div>



)

}