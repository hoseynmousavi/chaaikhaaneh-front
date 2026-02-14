import getTextConstant from "helpers/general/getTextConstant"
import showNumber from "helpers/input/showNumber"
import GiftSvg from "media/svg/GiftSvg"
import TickSvg from "media/svg/TickSvg"
import TomanSvg from "media/svg/TomanSvg"
import Checkbox from "views/components/checkbox/Checkbox"
import MaterialLink from "views/components/material/MaterialLink"

interface Props {
	date: Date
	amount: number
	isGift?: boolean
	isOverdue?: boolean
	isPaid: boolean
	isSelectedForPay?: boolean
	onClick?: () => void
}

function HomePaymentCard({date, amount, isGift, isOverdue, isPaid, isSelectedForPay, onClick}: Props) {
	const textConstant = getTextConstant()
	const Tag = isPaid ? "div" : MaterialLink
	const Icon = isGift ? GiftSvg : TickSvg
	return (
		<Tag className="home-payment-card" onClick={onClick}>
			<div className="home-payment-card-first">
				{isPaid ? <Icon className={`home-payment-card-first-tick ${isGift ? "gift" : ""}`} /> : <Checkbox mobileSize="large" isActive={!!isSelectedForPay} />}
				<div className="home-payment-card-first-title">{new Date(date).toLocaleDateString("fa-ir", {dateStyle: "short"})}</div>
				{isOverdue && <div className="home-payment-card-first-badge">{textConstant.overdue}</div>}
			</div>
			<div className="home-payment-card-second">
				<div className="home-payment-card-second-title">{showNumber(amount)}</div>
				<TomanSvg className="home-payment-card-second-icon" />
			</div>
		</Tag>
	)
}

export default HomePaymentCard
