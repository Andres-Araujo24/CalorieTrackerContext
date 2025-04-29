import {  useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../Data/categories"
import { Activity } from "../Types"
import { useActivity } from "../Hooks/useActivity"


const initialState: Activity = {
    id: uuidv4(), //Esta dependencia, es para generar ID unicos. Y este id es tipo string.
    category: 1,
    act: '',
    calorie: 0
}

export const Form = () => {
    const {state, dispatch} = useActivity()

    //Para no crear uno para cada uno, hacemos uno generico. 
    const [activity, setActivity] = useState<Activity>(initialState)

    //Para cuando haya algun cambio en activeId, me rellene los campos con las informaciones automaticamente
    useEffect(() => {
      if(state.activeId) {
        //Va a traer la misma actividad del id que se presiono. [0], es para que me retorne un objeto ya que filter retorna un array.
        const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
        setActivity(selectedActivity)
      }
    }, [state.activeId])
    

    //Para poder realizar cambios en el state, cuando seleccionen diferentes categorias y quieran agregar informaciones
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        //Para comprobar que estoy escribiendo en category o calorie
        const isNumberField = ['category', 'calorie'].includes(e.target.id)

        setActivity({
            //Hacemos copia para no perder la referencia del objeto, y de acuerdo al id y si estamos escribiendo en los campos establecidos en idNumberField, entonces se agregara el valor y lo convetira en numero sino solo agrega el valor.
            ...activity, [e.target.id]: isNumberField ? +e.target.value : e.target.value 
        })
    }

    //Deshabilitar button submit
    const isValidActivity = () => {
        const {act, calorie} = activity

        //Si eliminandole los espacios en blanco del principio y final es diferente a un string vacio y calorie es mayor a cero, habilita el button para guardar
        return act.trim() !== '' && calorie > 0
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        //Ejecutando las acciones del type, con la carga que tiene el payload.
        dispatch({type: 'save-activity', payload: {newActivity: activity}})

        //Reseteando activity y creando un id unico nuevo
        setActivity({
            ...initialState, //Copia
            id: uuidv4()
        })
    }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categories:</label>
            <select id="category" value={activity.category} className="border border-slate-300 p-2 rounded-lg bg-white w-full"
                onChange={handleChange}>
                {categories.map(category => (
                    <option key={category.id} value={category.id} >{category.name}</option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="act" className="font-bold">Activities:</label>
            <input type="text" id="act" className="border border-slate-300 p-2 rounded-lg" 
                placeholder="Ej. Food, Juice, Exercises, Gym Weight . . ." value={activity.act} onChange={handleChange}/>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calorie" className="font-bold">Calories:</label>
            <input type="number" id="calorie" className="border border-slate-300 p-2 rounded-lg" 
                placeholder="Calories. Ej. 200 o 500" value={activity.calorie} onChange={handleChange}/>
        </div>

        <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            value={activity.category === 1 ? 'Save Food' : 'Save Exercise'} 
            disabled={!isValidActivity()}
        />
    </form>
  )
}
