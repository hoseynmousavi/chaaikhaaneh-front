import useUser from "context/auth/hooks/useUser"
import useGetPlan from "context/plan/hooks/useGetPlan"
import getTextConstant from "helpers/general/getTextConstant"
import showNumber from "helpers/input/showNumber"
import TomanSvg from "media/svg/TomanSvg"

function HomePlanCard() {
	const textConstant = getTextConstant()
	const {user} = useUser()
	const {name, phone_number} = user || {}
	const {data} = useGetPlan()
	const {amount} = data || {}
	return (
		<div className="home-page-card">
			<div className="home-page-card-first">
				<div className="home-page-card-first-title">{name}</div>
				<div className="home-page-card-first-desc">{phone_number}</div>
			</div>
			<div className="home-page-card-second">
				<div className="home-page-card-second-top">
					<div>{showNumber(amount || 300000)}</div>
					<TomanSvg className="home-page-card-second-top-icon" />
				</div>
				<div className="home-page-card-second–desc">{textConstant.monthlyPay}</div>
			</div>
		</div>
	)
}

export default HomePlanCard
