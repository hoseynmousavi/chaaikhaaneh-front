const API_URLS = {
	refreshToken: "v1/user/token/refresh",
	profile: "v1/user/info",
	login: "v1/user/login",
	changePassword: "v1/user/change-password",

	plan: "v1/plan/user",
	getPaidTransactions: "v1/transactions/payments",
	payByPlan: "v1/transactions/pay",
	payGift: "v1/transactions/pay/extra",
	getPaymentResult: "v1/transactions/pay/result",
}

export default API_URLS
