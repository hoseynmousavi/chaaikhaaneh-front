import getTextConstant from "helpers/general/getTextConstant"
import showNumber from "helpers/input/showNumber"
import TickSvg from "media/svg/TickSvg"
import TomanSvg from "media/svg/TomanSvg"

interface Props {
	date: Date
	amount: number
	isOverdue?: boolean
}

function HomePaymentCard({date, amount, isOverdue}: Props) {
	const textConstant = getTextConstant()
	return (
		<div className="home-payment-card">
			<div className="home-payment-card-first">
				<TickSvg className="home-payment-card-first-tick" />
				<div className="home-payment-card-first-title">{new Date(date).toLocaleDateString("fa-ir", {dateStyle: "short"})}</div>
				{isOverdue && <div className="home-payment-card-first-badge">{textConstant.overdue}</div>}
			</div>
			<div className="home-payment-card-second">
				<div className="home-payment-card-second-title">{showNumber(amount)}</div>
				<TomanSvg className="home-payment-card-second-icon" />
			</div>
		</div>
	)
}

export default HomePaymentCard
