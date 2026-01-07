import type {PlanActionType, PlanStateType} from "context/plan/PlanType"

const planInitialState: PlanStateType = {plan: null}

export function planInit() {
	return planInitialState
}

function planReducer(state: PlanStateType = planInitialState, action: PlanActionType) {
	switch (action.type) {
		case "GET_PLAN": {
			const {res} = action.payload
			return {...state, plan: res}
		}
		case "RESET_DATA": {
			return planInitialState
		}
		default: {
			throw new Error()
		}
	}
}

export default planReducer
