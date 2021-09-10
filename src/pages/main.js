import React, {useMemo, useState, useEffect,useCallback} from 'react'
import { ItemFilter } from '../components/itemFilter'
import { ListItem } from '../components/listItem'
import { useLoader } from '../components/loader'
import { useDBService } from '../services/db'

export const Main = () => {
    
    const dbService = useDBService("items");

    const [Loader, setLoading] = useLoader(true);
    const [elements, setElements] = useState([]);
    const [dbElements, setDbElements] = useState([]);
    const [currentSearchText, setCurrentSearchText] = useState("");
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        dbService.onAdd( (e)=> {
            const newElement = { ...e.val(), elementKey:e.key }
            setDbElements((es) =>[...es,newElement ]);
            setElements( (es)=>[...es,newElement ]);
            setLoading(false)
        })
        
    }, [dbService,setLoading])

    
    const categories = useMemo(() => dbElements.reduce( (acc,e)=> {
        (acc[e.category])? acc[e.category].push(e):acc[e.category]=[e] 
        return acc;
    },[]) , [dbElements]);

    useEffect(() => {
        const applyFilter = (arr) => {
            if (currentSearchText!=="")
                return arr.filter(e=>e.description.toLowerCase().indexOf(currentSearchText.toLowerCase())!==-1 || e.shortDescription.toLowerCase().indexOf(currentSearchText.toLowerCase())!==-1 )
            else
                return arr;
        }

        if (!currentCategory || !categories[currentCategory])
            setElements( applyFilter(dbElements) )
        else
            setElements( applyFilter(categories[currentCategory]) )

    }, [dbElements,categories,currentCategory,currentSearchText])

    
    const categoriesList = useMemo(() => 
         Object.keys(categories).map( (cat)=>{ return {name:cat, size:categories[cat].length} } )
     , [categories]);

    const handleFilter = useCallback( (category) =>{
        setCurrentCategory(category)
    }, [])

    
    const handleSearch =useCallback(  (serachFilter) =>{
        setCurrentSearchText(serachFilter)
    }, [])

    return (
    <Loader>
        <div className="flex flex-col h-screen antialiased text-gray-800">
            <div className="flex flex-col py-2 pl-6 pr-2 w-full bg-white flex-shrink-0 bg-gray-400">
                <span className="text-xl font-bold flex items-center justify-center">Venta de Garage</span>
            </div>
            <div className="sticky flex flex-row sm:hidden bg-gray-200 pb-2">
                    <ItemFilter onFilter={handleFilter} onSearch={handleSearch} categories={categoriesList}></ItemFilter>
            </div>
            <div className="flex flex-row h-screen w-full overflow-x-hidden ">
                <div className="flex flex-col pb-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 bg-gray-200 hidden sm:block pr-2">
                    <ItemFilter onFilter={handleFilter} categories={categoriesList} onSearch={handleSearch}></ItemFilter>
                </div>
                <div className="flex flex-col flex-auto h-full sm:p-6 mt-8" style={{overflow:"scroll"}}>
                    <ListItem elements = {elements}></ListItem>
                </div>
            </div>
        </div>
    </Loader>
    )



}
