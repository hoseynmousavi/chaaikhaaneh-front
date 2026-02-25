import useGetPaidTransactions from "context/plan/hooks/useGetPaidTransactions"
import type {PlanType} from "context/plan/PlanType"
import getTextConstant from "helpers/general/getTextConstant"
import HomeEmptyState from "views/components/home/HomeEmptyState"
import HomePaymentCard from "views/components/home/HomePaymentCard"
import HomePaymentCardSkeleton from "views/components/home/HomePaymentCardSkeleton"

interface Props {
	plan: PlanType | null
	isPlanLoading: boolean
}

function HomePaidTab({plan, isPlanLoading}: Props) {
	const textConstant = getTextConstant()
	const {data, isLoading: isTransactionsLoading} = useGetPaidTransactions()
	const {paid_through} = plan || {}
	const isLoading = isPlanLoading || isTransactionsLoading
	const notGiftData = data.filter(({payment_type}) => payment_type !== "extra")
	return (
		<div className="home-page-tab">
			{data.length && paid_through
				? data.map(({id, amount, paid_at, payment_type}) => (
						<HomePaymentCard
							key={id}
							amount={amount}
							isGift={payment_type === "extra"}
							date={
								payment_type === "extra"
									? paid_at
									: new Date(new Date(paid_through).getTime() - notGiftData.findIndex(i => i.id === id) * 30 * (24 * 60 * 60 * 1000))
							}
							paidDate={payment_type === "extra" ? undefined : paid_at}
							isPaid
						/>
					))
				: !isLoading && <HomeEmptyState title={textConstant.paymentsEmpty} />}

			{isLoading && new Array(3).fill(0).map((_, index) => <HomePaymentCardSkeleton key={index} />)}
		</div>
	)
}

export default HomePaidTab
