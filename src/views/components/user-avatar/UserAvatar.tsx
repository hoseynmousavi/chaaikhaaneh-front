import AVATAR_COLORS from "constant/images/AVATAR_COLORS"
import IMAGES from "constant/images/IMAGES"
import type {UserType} from "context/auth/AuthType"
import getUserName from "helpers/general/getUserName"
import UserSvg from "media/svg/UserSvg"
import type {ImageResizeType} from "types/ImageType"
import Image from "views/components/image/Image"

type size = "xxx-large" | "xx-large" | "x-large" | "large" | "medium" | "small"

interface Props {
	user?: UserType | null
	className?: string
	zoomOnClick?: boolean
	desktopSize?: size
	mobileSize?: size
	resize?: ImageResizeType
	isSkeleton?: boolean
}

function UserAvatar(props: Props) {
	const {user,  className = "", zoomOnClick, desktopSize, mobileSize, resize, isSkeleton} = props
	const name = user? getUserName({user}) : ""
	const src = user ? user.avatar  : undefined
	const desktopSizeClass = `desktop-${desktopSize || mobileSize || "large"}`
	const mobileSizeClass = `mobile-${mobileSize || desktopSize || "large"}`
	const classNames = `${className} ${desktopSizeClass} ${mobileSizeClass}`

	if (isSkeleton) {
		return <div className={`user-avatar skeleton ${classNames}`} />
	} else if (src) {
		return <Image className={`user-avatar ${classNames}`} src={src} alt={name} resize={{aspectRatio: 1, size: 80, placeholder: IMAGES.placeholders.user, ...resize}} zoomOnClick={zoomOnClick} />
	} else if (name) {
		const char = name[0]
		const charCode = name.charCodeAt(0) % 10
		const color = AVATAR_COLORS[charCode]
		return (
			<div className={`user-avatar text-avatar ${classNames}`} style={{backgroundColor: color}}>
				{char}
			</div>
		)
	} else {
		return (
			<div className={`user-avatar user-svg ${classNames}`}>
				<UserSvg />
			</div>
		)
	}
}

export default UserAvatar
