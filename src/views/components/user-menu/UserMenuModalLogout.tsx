import getTextConstant from "helpers/general/getTextConstant"
import resetDataManager from "helpers/storage/resetDataManager"
import Button from "views/components/button/Button"

function UserMenuModalLogout() {
	const textConstant = getTextConstant()
	function logout() {
		resetDataManager.resetData({isAfterLogin: false})
	}

	return (
		<div className="user-menu-logout">
			<div className="user-menu-logout-title">{textConstant.logout}</div>
			<div className="user-menu-logout-desc">{textConstant.logoutDesc}</div>
			<Button mobileIsFullWidth mobileType="error" onClick={logout}>
				{textConstant.logoutBtn}
			</Button>
		</div>
	)
}

export default UserMenuModalLogout
