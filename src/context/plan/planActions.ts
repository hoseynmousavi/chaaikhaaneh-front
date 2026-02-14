import API_URLS from "constant/routing/API_URLS"
import type {GetPaidTransactionsActionType, GetPlanActionType, PlanType, TransactionType} from "context/plan/PlanType"
import type {Dispatch, RefObject} from "react"
import request from "request/request"

function getPlan({planDispatch, cancelToken}: {planDispatch: Dispatch<GetPlanActionType>; cancelToken?: RefObject<AbortController | null>}) {
	return request.get({url: API_URLS.plan, cancelToken}).then((res: PlanType) => {
		planDispatch({
			type: "GET_PLAN",
			payload: {res},
		})
	})
}

function getPaidTransactions({
	page,
	pageSize,
	planDispatch,
	cancelToken,
}: {
	page: number
	pageSize: number
	planDispatch: Dispatch<GetPaidTransactionsActionType>
	cancelToken?: RefObject<AbortController | null>
}) {
	return request.get({url: API_URLS.getPaidTransactions, cancelToken, params: {status: "paid", page, page_size: pageSize}}).then((res: {count: number; results: Array<TransactionType>}) => {
		planDispatch({
			type: "GET_PAID_TRANSACTIONS",
			payload: {res, page: page + 1},
		})
	})
}

function payByPlan({months}: {months: number}) {
	return request.post({url: API_URLS.payByPlan, data: {months}}).then((res: {track_id: string; order_id: string; payment_url: string}) => {
		return res
	})
}

function payGift({amount}: {amount: number}) {
	return request.post({url: API_URLS.payGift, data: {amount, description: "هدیه"}}).then((res: {track_id: string; order_id: string; payment_url: string}) => {
		return res
	})
}

function getPaymentResult({track_id, cancelToken}: {track_id: string; cancelToken?: RefObject<AbortController | null>}) {
	return request.get({url: API_URLS.getPaymentResult, cancelToken, params: {track_id}}).then(({payment}: {payment: TransactionType}) => {
		return payment
	})
}

const planActions = {
	getPlan,
	getPaidTransactions,
	payByPlan,
	payGift,
	getPaymentResult,
}

export default planActions
