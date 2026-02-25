export interface PlanType {
	billing_anchor: Date
	paid_through: Date | null
	amount: number
	overdue_months: number
}

export interface PlanStateType {
	plan: null | PlanType
	paidTransactions: {
		list: Array<TransactionType>
		count: number | undefined
		page: number | undefined
	}
}

export interface TransactionType {
	id: number
	order_id: string
	track_id: number
	amount: number
	months: number
	status: "paid" | "failed"
	paid_at: Date
	payment_type: "extra" | "ss"
}

export interface GetPlanActionType {
	type: "GET_PLAN"
	payload: {res: PlanType}
}

export interface GetPaidTransactionsActionType {
	type: "GET_PAID_TRANSACTIONS"
	payload: {res: {count: number; results: Array<TransactionType>}; page: number}
}

export type PlanActionType = GetPlanActionType | GetPaidTransactionsActionType | {type: "RESET_DATA"}
