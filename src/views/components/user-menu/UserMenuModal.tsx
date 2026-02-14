import getTextConstant from "helpers/general/getTextConstant"
import startViewTransition from "helpers/general/startViewTransition"
import ArrowLeftSvg from "media/svg/ArrowLeftSvg"
import KeySvg from "media/svg/KeySvg"
import LogoutSvg from "media/svg/LogoutSvg"
import {useState} from "react"
import AutoHeight from "views/components/auto-height/AutoHeight"
import MaterialLink from "views/components/material/MaterialLink"
import Modal from "views/components/modal/Modal"
import UserMenuModalLogout from "views/components/user-menu/UserMenuModalLogout"

interface Props {
	close: () => void
}

interface MenuType {
	step: 0 | 1 | 2
	selectedMenu: "password" | "logout"
}

function UserMenuModal({close}: Props) {
	const [{step, selectedMenu}, setSelectMenu] = useState<MenuType>({step: 0, selectedMenu: "logout"})
	const textConstant = getTextConstant()

	function changeMenu(menu: MenuType) {
		return () => {
			startViewTransition({
				update: () => setSelectMenu(menu),
				types: ["user-menu"],
			})
		}
	}

	return (
		<Modal className="user-menu" close={close}>
			<AutoHeight>
				{step === 0 ? (
					<div className="user-menu-sheet">
						<MaterialLink className="user-menu-sheet-item">
							<KeySvg className="user-menu-sheet-item-icon" />
							<div className="user-menu-sheet-item-title">{textConstant.changePass}</div>
							<ArrowLeftSvg className="user-menu-sheet-item-arrow" />
						</MaterialLink>
						<MaterialLink className="user-menu-sheet-item" onClick={changeMenu({step: 1, selectedMenu: "logout"})}>
							<LogoutSvg className="user-menu-sheet-item-icon" />
							<div className="user-menu-sheet-item-title">{textConstant.logout}</div>
							<ArrowLeftSvg className="user-menu-sheet-item-arrow" />
						</MaterialLink>
					</div>
				) : selectedMenu === "password" ? (
					<></>
				) : (
					<UserMenuModalLogout />
				)}
			</AutoHeight>
		</Modal>
	)
}

export default UserMenuModal
