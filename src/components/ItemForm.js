import React, {useState} from 'react'
import { Button } from './button'
import { ItemContainer, FormContainer, ButtonContainer } from './form/itemContainer'
import { ItemDate } from './form/itemDate'
import { ItemInput } from './form/itemInput'
import { Item } from './item'

export const ItemForm = ({onSubmit,onCancel,element, ...props}) =>{
    console.log(element);
    const defaultValues = {
        category:"",
        description:"",
        shortDescription:"",
        price:"",
        img:"",
        date:Date.now()
    };
    const [ values, setValues ] = useState(element||defaultValues)

    const handleChange = ({currentTarget})=>{ 
        const {value,name} = currentTarget;
        
        setValues ( (v) => { return{...v, [name]:value }   } );
    }

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        event.stopPropagation();
        onSubmit(values);

    }
    const handleCancel =(event) =>{
        event.preventDefault();
        event.stopPropagation();
        onCancel();
        setValues(defaultValues);
    }
    return (
        <div className="flex flex-wrap items-center justify-center bg-gray-300 h-screen select-none">
        <FormContainer title="Agregar un producto">
            <form onSubmit={handleFormSubmit}>
                <ItemContainer>
                    <ItemInput onChange={handleChange} required label="Descripcion" name="shortDescription"  value={values.shortDescription} placeholder="Ingrese la descripcion corta del articulo"></ItemInput>
                </ItemContainer>
                <ItemContainer>
                    <ItemInput onChange={handleChange} required label="category" name="category" value={values.category} placeholder="Ingrese la categoria del articulo"></ItemInput>
                </ItemContainer>
                <ItemContainer>
                    <ItemInput onChange={handleChange} required label="Descripcion Larga" name="description" value={values.description} placeholder="Ingrese la descripcion larga del articulo"></ItemInput>
                </ItemContainer>
                <ItemContainer>
                    <ItemInput onChange={handleChange} required label="Valor" name="price" value={values.price} placeholder="Ingrese el valor del articulo"></ItemInput>
                </ItemContainer>
                <ItemContainer>
                    <ItemInput onChange={handleChange} label="Imagen" name="img" value={values.img} placeholder="Ingrese la imagen"></ItemInput>
                </ItemContainer>
                <ItemContainer>
                    <ItemDate onChange={handleChange} selected={values.date} label="Fecha entrega" name="date" > </ItemDate>
                </ItemContainer>
                <ButtonContainer>
                    <Button>Guardar</Button>
                    <Button onClick={handleCancel} alternate ="true">Cancelar</Button>
                </ButtonContainer>
            </form>
        </FormContainer>
        <div className="flex flex-col flex-none w-1/3 pl-40 pr-30">
            <h1>
                Vista Previa
            </h1>
            <div className ='mt-4' style={ {overflowWrap: "break-word"}}>
                <Item {...values}> </Item>
            </div>
        </div>
        </div>

    )

}