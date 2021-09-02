import React, {useMemo, useState} from 'react'
import { ItemFilter } from '../components/itemFilter'
import { ListItem } from '../components/listItem'
import { UserData } from '../components/userData'
import { items as listItems } from '../data/items'
export const Main = () => {
    
    const [elements, setElements] = useState(listItems);

    const categories = useMemo(() => listItems.reduce( (acc,e)=> {
        (acc[e.category])? acc[e.category].push(e):acc[e.category]=[e] 
        return acc;
    },[]) , listItems);
    
    const handleFilter = (category) =>{
        setElements( categories[category] );
    }

    return (

        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 bg-gray-100">
                    <UserData></UserData>
                    <ItemFilter onFilter={handleFilter} categories={Object.keys(categories)}></ItemFilter>
                </div>
                <div className="flex flex-col flex-auto h-full p-6 ">
                    <ListItem elements = {elements}></ListItem>
                </div>
            </div>
        </div>

    )



}
