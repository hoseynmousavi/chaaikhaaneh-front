export interface PlanStateType {
	plan: null | PlanType
}

export interface PlanType {
	amount: number | null
}

export interface GetPlanActionType {
	type: "GET_PLAN"
	payload: {res: PlanType}
}

export type PlanActionType = GetPlanActionType | {type: "RESET_DATA"}
