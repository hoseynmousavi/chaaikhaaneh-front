import getTextConstant from "helpers/general/getTextConstant"
import resetDataManager from "helpers/storage/resetDataManager"
import LineArrowRightSvg from "media/svg/LineArrowRightSvg"
import Button from "views/components/button/Button"

function UserMenuModalLogout({back}: {back: () => void}) {
	const textConstant = getTextConstant()
	function logout() {
		resetDataManager.resetData({isAfterLogin: false})
	}

	return (
		<div className="user-menu-logout">
			<Button mobileType="ghost-on-surface-first" mobileSize="small" mobileIsRounded mobileIsSquare className="user-menu-logout-back" onClick={back}>
				<LineArrowRightSvg />
				<div>{textConstant.back}</div>
			</Button>
			<div className="user-menu-logout-title">{textConstant.logout}</div>
			<div className="user-menu-logout-desc">{textConstant.logoutDesc}</div>
			<Button mobileIsFullWidth mobileType="error" onClick={logout}>
				{textConstant.logoutBtn}
			</Button>
		</div>
	)
}

export default UserMenuModalLogout
