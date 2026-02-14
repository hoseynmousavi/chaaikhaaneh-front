import useGetPlan from "context/plan/hooks/useGetPlan"
import getTextConstant from "helpers/general/getTextConstant"
import HomeEmptyState from "views/components/home/HomeEmptyState"
import HomePaymentCardSkeleton from "views/components/home/HomePaymentCardSkeleton"
import HomeSelectPayment from "views/components/home/HomeSelectPayment"

function HomeDueTab() {
	const textConstant = getTextConstant()
	const {data: plan, isLoading} = useGetPlan()
	const {amount, overdue_months, billing_anchor, paid_through} = plan || {}

	return (
		<div className="home-page-tab">
			{isLoading ? (
				new Array(3).fill(0).map((_, index) => <HomePaymentCardSkeleton key={index} />)
			) : overdue_months && amount && (paid_through || billing_anchor) ? (
				<HomeSelectPayment
					items={new Array(overdue_months).fill(0).map((_, index) => ({
						amount,
						date: new Date(new Date((paid_through || billing_anchor) as Date).getTime() + (index + 1) * 30 * (24 * 60 * 60 * 1000)),
						isOverdue: index > 0,
					}))}
				/>
			) : (
				<HomeEmptyState title={textConstant.dueEmpty} />
			)}
		</div>
	)
}

export default HomeDueTab
