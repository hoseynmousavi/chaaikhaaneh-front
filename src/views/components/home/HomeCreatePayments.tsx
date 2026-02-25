import type {PlanType} from "context/plan/PlanType"
import jalaliToMiladi from "helpers/date-time/jalaliToMiladi"
import numberCorrection from "helpers/input/numberCorrection"
import HomeSelectPayment from "views/components/home/HomeSelectPayment"

interface Props {
	plan: PlanType
}

function HomeCreatePayments({plan}: Props) {
	const {amount, overdue_months, billing_anchor, paid_through} = plan
	const lastPaymentDate = new Date(new Date(paid_through || billing_anchor).setHours(0, 0, 0, 0))

	const nowDate = new Date().setHours(0, 0, 0, 0)

	const payments = new Array(overdue_months).fill(0).map((_, index) => {
		const date = new Date(new Date(lastPaymentDate).getTime() + (index + 1) * 30 * (24 * 60 * 60 * 1000))
		const isOverdue = nowDate >= date.getTime() + 5 * (24 * 60 * 60 * 1000)
		const defaultSelected = nowDate >= date.getTime()
		return {
			amount,
			date,
			isOverdue,
			defaultSelected,
		}
	})

	const nextJalaliYear = +numberCorrection(new Date().toLocaleDateString("fa-ir", {year: "numeric"})) + 1
	const jalaliLastYearDay = new Date(Object.values(jalaliToMiladi({year: nextJalaliYear, month: 12, day: 29})).join("-"))
	const diffToEndOfYear = (+jalaliLastYearDay - new Date(payments[payments.length - 1]?.date ?? lastPaymentDate).getTime()) / (1000 * 60 * 60 * 24)
	new Array(Math.floor(diffToEndOfYear / 30)).fill(0).forEach(_ => {
		payments.push({
			amount,
			date: new Date(new Date(payments[payments.length - 1]?.date ?? lastPaymentDate).getTime() + 30 * (24 * 60 * 60 * 1000)),
			isOverdue: false,
			defaultSelected: false,
		})
	})

	return <HomeSelectPayment items={payments} planAmount={amount} />
}

export default HomeCreatePayments
