import { Activity } from "../Types"

//El type es la accion que se hara, el payload es la carga que contiene.
export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } | //Para editar elemento mediante id
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' }

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}
//Para que rebice si tenemos algo en el Local Storage
const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities') //Obteniendo las actividades
    //Retornamos activities y si tiene, pues lo convertimos a un arreglo y sino tiene retornamos un arreglo vacio
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    //Para guardar nueva actividad o actualizarla
    if (action.type === 'save-activity') {
        //Comenzando con un arreglo vacio.
        let updatedActivities: Activity[] = []
        //SI tenemos algo en activeId significa que estamos editando. Iteramos para saber cual es y decirle que cargue el payload con newActivity, caso contrario retornamos activity.
        if (state.activeId) {
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity
                : activity)
        } else { //Si no estamos editando, estamos creando una nueva
            updatedActivities = [...state.activities, action.payload.newActivity] //Actualizando activities
        }

        //Siempre lleva un return. Ese return va a retornar el estado actualizado
        return {
            //Agregando una copia para no perder la referencia por si se sigue escribiendo
            ...state,
            activities: updatedActivities,
            activeId: '' //Cada que haya una nueva actividad lo reinicio.
        }
    }

    //Para editar una actividad mediante el id
    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    //Para eliminar
    if (action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id) //Como lo negamos !== diciendo que es diferente, es para que traiga todas las actividades diferente a la que elegimos o eliminamos
        }
    }

    //Para resetear la app
    if (action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}