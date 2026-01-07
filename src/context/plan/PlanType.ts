export interface PlanStateType {
	plan: null | PlanType
}

export interface PlanType {
	id: number
	created_at: Date
	amount: number
	status: "active"
}

export interface GetPlansActionType {
	type: "GET_PLAN"
	payload: {res: PlanType}
}

export type PlanActionType = GetPlansActionType | {type: "RESET_DATA"}
