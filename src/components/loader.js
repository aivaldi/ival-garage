import React, {useState, useMemo} from 'react';

export const useLoader = (value=false) =>{
    const [isLoading, setLoading] = useState(value);
    
    const Factory = useMemo(() => LoaderFactory(isLoading), [isLoading])

    return [ Factory, setLoading ]

}

export const LoaderFactory = (onLoading) => React.memo((props) =>{
    
    return (
        onLoading? (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
            <span className="text-blue-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{top: "50%"} }>
                <i className="fas fa-circle-notch fa-spin fa-5x"></i>
            </span>
            </div>):<> {props.children} </>
    )

    }
)