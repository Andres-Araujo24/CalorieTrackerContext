import { useEffect, useMemo } from "react"
import { Form } from "./Components/Form"
import { ActivityList } from "./Components/ActivityList"
import { CalorieTracker } from "./Components/CalorieTracker"
import { useActivity } from "./Hooks/useActivity"


function App() {
  //Usando Context mediante hook
  const {state, dispatch} = useActivity()

  //Para el Local Storage
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities)) //Convertimos ese arreglo en un string con JSON
  }, [state.activities]) //Escuchando por cambios aqui.
  
  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state?.activities])

  return (
    <>
      <header className=" bg-lime-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">Calorie Counter</h1>

          <button className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({type: 'restart-app'})}>
            Restart App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form/>
        </div>
      </section>

      <section className="bg-gray-800 py-10">
          <div className="max-w-4xl mx-auto">
            <CalorieTracker />
          </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList/>
      </section>
    </>
  ) //Pasandole unicamente el state de activities que es lo que se requiere
}

export default App
