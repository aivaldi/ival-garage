import React from 'react'
import {useDBService} from '../services/db'

export const ItemForm = ({id}) =>{
    const dbService = useDBService("/item");

    useEffect(() => {
        if (id)
            dbService.get(id);
    }, [id])

    return (
        <Form>
            
        </Form>

    )


}