import useGetPlan from "context/plan/hooks/useGetPlan"
import getTextConstant from "helpers/general/getTextConstant"
import HomeCreatePayments from "views/components/home/HomeCreatePayments"
import HomeEmptyState from "views/components/home/HomeEmptyState"
import HomePaymentCardSkeleton from "views/components/home/HomePaymentCardSkeleton"

function HomeNotPaidTab() {
	const textConstant = getTextConstant()
	const {data: plan, isLoading} = useGetPlan()
	const {amount, overdue_months, billing_anchor, paid_through} = plan || {}

	return (
		<div className="home-page-tab">
			{isLoading ? (
				new Array(3).fill(0).map((_, index) => <HomePaymentCardSkeleton key={index} />)
			) : plan ? (
				<HomeCreatePayments overdue_months={overdue_months!} amount={amount!} last_payment_date={new Date(new Date((paid_through || billing_anchor)!).setHours(0, 0, 0, 0))} />
			) : (
				<HomeEmptyState title={textConstant.dueEmpty} />
			)}
		</div>
	)
}

export default HomeNotPaidTab
