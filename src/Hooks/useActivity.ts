import { useContext } from "react";
import { ActivityContext } from "../Context/ActivityContext";

//Para acceder al ActivityContext para usar el state y dispatch sin tener que estar en cada parte llamando al context
export const useActivity = () => {
    const context = useContext(ActivityContext)

    //Si no esta siendo llamado de un context, mandamos un error
    if(!context) {
        throw new Error('The useActivity hook must be used on ActivityProvider')
    }
    return context
}