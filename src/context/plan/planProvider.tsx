import type {PlanActionType, PlanStateType} from "context/plan/PlanType"
import planReducer, {planInit} from "context/plan/planReducer"
import resetDataManager from "helpers/storage/resetDataManager"
import {createContext, type Dispatch, type ReactNode, useEffect, useReducer} from "react"

// @ts-expect-error
export const planContext = createContext<{planState: PlanStateType; planDispatch: Dispatch<PlanActionType>}>(null)

function PlanProvider({children}: {children: ReactNode}) {
	const [planState, planDispatch] = useReducer(planReducer, planInit())

	useEffect(() => {
		resetDataManager.setResetDataListener({callBack: () => planDispatch({type: "RESET_DATA"})})
	}, [])

	return <planContext.Provider value={{planState, planDispatch}}>{children}</planContext.Provider>
}

export default PlanProvider
