import {useMemo} from 'react';
import {db} from './firebase';
import firebase from "firebase";

export const useDBService = (resource) => {
    const ref = useMemo(() => db.ref(resource), [resource]) ;
    
    return useMemo(() => {
        return {
            onAdd(callback) { 
                return ref.on("child_added", function(snapshot) {
                    callback(snapshot);
                    } );      
            },
            onUpdate(callback) { 
                return ref.on("child_changed", function(snapshot) {
                    callback(snapshot);
                    } );      
            },
            onRemove(callback) { 
                return ref.on("child_removed", function(snapshot) {
                    callback(snapshot);
                    } );      
            },
            save(element, callback) { 
                ref.push({...element, id:firebase.database.ServerValue.TIMESTAMP}, callback || ( ()=>{} ));      
            },
            update(key, element) { 
                var updateRef = ref.child(key);
                updateRef.update(element);
                
            },
            delete (element, callback) { 
                const userRef = ref.child(element);
                userRef.remove()
            }
        };
    }, [ref])
    

}