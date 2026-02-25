import type {PlanType} from "context/plan/PlanType"
import getTextConstant from "helpers/general/getTextConstant"
import HomeCreatePayments from "views/components/home/HomeCreatePayments"
import HomeEmptyState from "views/components/home/HomeEmptyState"
import HomePaymentCardSkeleton from "views/components/home/HomePaymentCardSkeleton"

interface Props {
	plan: PlanType | null
	isPlanLoading: boolean
}

function HomeNotPaidTab({plan, isPlanLoading}: Props) {
	const textConstant = getTextConstant()
	return (
		<div className="home-page-tab">
			{isPlanLoading ? (
				new Array(3).fill(0).map((_, index) => <HomePaymentCardSkeleton key={index} />)
			) : plan ? (
				<HomeCreatePayments plan={plan} />
			) : (
				<HomeEmptyState title={textConstant.dueEmpty} />
			)}
		</div>
	)
}

export default HomeNotPaidTab
