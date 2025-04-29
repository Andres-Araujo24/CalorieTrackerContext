import { createContext, ReactNode, useMemo, useReducer } from "react";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../Reducers/activity-reducer";
import { categories } from "../Data/categories";
import { Activity } from "../Types";

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState,
    dispatch: React.Dispatch<ActivityActions>,
    //CalorieTracker
    caloriesConsumed: number,
    caloriesBurned: number,
    netCalories: number,
    //ActivityList
    categoryName: (category: Activity["category"]) => string[],
    isEmptyActivities: boolean
}

//Todo esto es configurando el Context. Ahora para que funcione bien, vamos al main.tsx

export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({ children }: ActivityProviderProps) => {

    //Aqui lo que se va a compartir en este Provider. Utilizado el activityReducer y el initialState del mismo reducer.
    const [state, dispatch] = useReducer(activityReducer, initialState)



    //Counters, Esto pertenece a CalorieTracker

    //Revisamos si la actividad actual es igual a la categoria 1, entonces lo sumo, caso contrario, paso el total como esta.
    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ?
        total + activity.calorie : total, 0)//Valor inicial 0, recordar que este reduce ocupa dos parametros
        , [state.activities]) //Cada que tengamos actividades nuevas, el codigo se vuelva a ejecutar

    const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ?
        total + activity.calorie : total, 0)
        , [state.activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])



    //Pertenece a ActivityList

    //Para que cuando seleccionemos entre comida o ejercicio no muestre el numero sino que muestre la categoria en si.
    const categoryName = useMemo(() => (category: Activity['category']) => (
        categories.map(cat => cat.id === category ? cat.name : ' '))
        , [state.activities])

    //Para saber si hay actividades y que escuche por cambios, dependiendo de lo que devuelva hara algo en el return.
    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

    return (
        <ActivityContext.Provider value={{ //Haciendolos disponibles para usar
            state, dispatch, caloriesConsumed, caloriesBurned, netCalories, categoryName, isEmptyActivities
        }}>
            {children}
        </ActivityContext.Provider>
    )
}
