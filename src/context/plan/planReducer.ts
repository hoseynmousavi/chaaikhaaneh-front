import type {PlanActionType, PlanStateType} from "context/plan/PlanType"

const planInitialState: PlanStateType = {
	plan: null,
	paidTransactions: {
		list: [],
		count: undefined,
		page: undefined,
	},
}

export function planInit() {
	return planInitialState
}

function planReducer(state: PlanStateType = planInitialState, action: PlanActionType) {
	switch (action.type) {
		case "GET_PLAN": {
			const {res} = action.payload
			return {
				...state,
				plan: res,
			}
		}
		case "GET_PAID_TRANSACTIONS": {
			const {
				res: {count, results},
				page,
			} = action.payload
			return {
				...state,
				paidTransactions: {
					...state.paidTransactions,
					list: [...new Map([...state.paidTransactions.list, ...results].map(item => [item.id, item])).values()],
					page,
					count,
				},
			}
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
