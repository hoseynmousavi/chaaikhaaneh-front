import getTextConstant from "helpers/general/getTextConstant"
import useToggle from "hooks/general/useToggle"
import AddSvg from "media/svg/AddSvg"
import MoreSvg from "media/svg/MoreSvg"
import Button from "views/components/button/Button"
import GiftModal from "views/components/gift/GiftModal"
import UserMenuModal from "views/components/user-menu/UserMenuModal"

function HomeHeader() {
	const textConstant = getTextConstant()
	const [isGiftModalOpen, toggleGiftModal] = useToggle(false)
	const [isMenuModalOpen, toggleMenuModal] = useToggle(false)
	return (
		<>
			<div className="home-page-header">
				<Button mobileType="surface-second-on-surface-first" mobileSize="medium" mobileIsRounded onClick={toggleGiftModal}>
					<AddSvg />
					{textConstant.payGift}
				</Button>
				<Button mobileType="surface-second-on-surface-first" mobileSize="medium" mobileIsRounded mobileIsSquare onClick={toggleMenuModal}>
					<MoreSvg />
				</Button>
			</div>

			{isGiftModalOpen && <GiftModal close={toggleGiftModal} />}
			{isMenuModalOpen && <UserMenuModal close={toggleMenuModal} />}
		</>
	)
}

export default HomeHeader
