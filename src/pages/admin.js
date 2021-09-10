import React, { useState, useEffect,useCallback} from 'react'
import { MemorizedItemFilter } from '../components/itemFilter'
import { ListItem} from '../components/listItem'
import { useLoader } from '../components/loader'
import firebase from 'firebase'
import { Button } from '../components/button'
import { ItemForm } from '../components/ItemForm'
import { useDBService } from '../services/db'
import { usePopUp } from '../components/popup'

export const Admin = () => {
    
    const [dbElements, setDBElements] = useState([]);
    const [elements, setElements] = useState([]);
    const [Loader, setLoading] = useLoader(true);
    const [currentUser, setCurrentUser] = useState(null)
    const [elementState, setElementState] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentSearchText, setCurrentSearchText] = useState("");
    
    const dbService = useDBService("items");

    useEffect(() => {
        dbService.onAdd( (e)=> {
            const newElement = { ...e.val(), elementKey:e.key }
            setDBElements((es) =>[...es,newElement ])
        })
        dbService.onRemove( (element)=> {
            debugger;
            setDBElements((es) => [...es.filter( e=> e.elementKey!==element.key) ])
        })
        dbService.onUpdate( (element)=> {
            const newElement = { ...element.val(), elementKey:element.key }
            setDBElements((es) =>{
                const idx = es.indexOf(e=> e.elementKey===element.key)
                es.splice(idx,1,newElement);
                return [...es]
            } )
        })
        
    }, [dbService])

    const showList = () =>{
        setElementState(null);
    }
    
    const showElementNew = () =>{
        setElementState({ elementKey:null });
    }

    const showElementEdit = (element) =>{
        setElementState(element);
    }


    firebase.auth().onAuthStateChanged(function(user) {
      setLoading(false)
      setCurrentUser(firebase.auth().currentUser);
    });


    useEffect(() => {
        setCategories(
            dbElements.reduce( (acc,e)=> {
                (acc[e.category])? acc[e.category].push(e):acc[e.category]=[e];
                return acc;
            },[])

        )
    }, [dbElements])

    useEffect(() => {
        setCategoriesList(
            Object.keys(categories).map( (cat)=>{ return {name:cat, size:categories[cat].length} } )
        )
    }, [categories])


    useEffect(() => {
        const applyFilter = (arr) => {
            if (currentSearchText!=="")
                return arr.filter(e=>e.description.indexOf(currentSearchText)!==-1 || e.shortDescription.indexOf(currentSearchText)!==-1 )
            else
                return arr;
        }

        if (!currentCategory || !categories[currentCategory])
            setElements( applyFilter(dbElements) )
        else
            setElements( applyFilter(categories[currentCategory]) )

    }, [dbElements,categories,currentCategory,currentSearchText])

    const handleFilter = useCallback( (category) =>{
        setCurrentCategory(category)
    }, [])

    const handleSearch =useCallback(  (serachFilter) =>{
        setCurrentSearchText(serachFilter)
    }, [])

    const handleAdd = ()=>{
        showElementNew() 
    }

    const handleSubmit = (values) =>{
        if (values.elementKey){
            const elToUp = {...values}
            delete elToUp["elementKey"];
            dbService.update(values.elementKey, elToUp);
        }
        else
            dbService.save(values )
        showList();
    }
    const handleCancel = () =>{
        showList();
    }

    const onConfirmDelete = ()=>{
        if (!selectedElement)
            return;
        dbService.delete(selectedElement)
        toggleDeletePopUp();
    }

    const {toggle:toggleDeletePopUp, Component:DeletePopUp} = usePopUp({ title:"Eliminar elemento", message:"Esta seguro que quiere elminiar el elemento indicado", callback:onConfirmDelete })

    const handleDelete= (id)=>{
        setSelectedElement(id);
        toggleDeletePopUp();
    }
    const handleEdit= (key=>{
        showElementEdit(dbElements.find(e =>e.elementKey===key  ))

    });



    return (
        <Loader>
            <div className="flex h-screen antialiased text-gray-800" relative="true">
                <div className="flex flex-row h-full w-full overflow-x-hidden">
                    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 bg-gray-100">
                        <Button key={'button'} onClick={handleAdd}>Agregar Item</Button>
                        <MemorizedItemFilter user={currentUser} onFilter={handleFilter} onSearch={handleSearch} categories={categoriesList}></MemorizedItemFilter>
                    </div>
                    
                    <div className="flex flex-col flex-auto h-full p-6" style={{overflow:"scroll"}}>
                        <div>
                        { elementState?  <ItemForm  onSubmit={handleSubmit} onCancel={handleCancel} element={elementState} ></ItemForm> :<ListItem  onDelete={handleDelete} onEdit={handleEdit} elements = {elements}></ListItem> } 
                        </div>
                        
                    </div>
                </div>
                <DeletePopUp/>
            </div>
        </Loader>

    )



}
