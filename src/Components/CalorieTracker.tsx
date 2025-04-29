import { CalorieDisplay } from "./CalorieDisplay"
import { useActivity } from "../Hooks/useActivity"



export const CalorieTracker = () => {
    const {caloriesConsumed, caloriesBurned, netCalories} = useActivity()

  return (
    <>
        <h2 className="text-4xl font-black text-white text-center">Calorie Summary</h2>

        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CalorieDisplay calories={caloriesConsumed} text='Consumed' />

            <CalorieDisplay calories={caloriesBurned} text='Burned' />
            
            <CalorieDisplay calories={netCalories} text='Differences' />
        </div>
    </>
  )
}
