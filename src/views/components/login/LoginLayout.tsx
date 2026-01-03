import {APP_NAME_FA} from "constant/text/APP_NAME_FA"
import router from "helpers/router/router"
import LineArrowRightSvg from "media/svg/LineArrowRightSvg"
import LogoSvg from "media/svg/LogoSvg"
import type {ReactNode} from "react"
import type {ComponentAsPropsType} from "types/ComponentAsPropsType"
import Button from "views/components/button/Button"
import Image from "views/components/image/Image"

interface Props {
	children: ReactNode
	showBackBtn?: boolean
	title?: string
	desc?: string
	Icon?: ComponentAsPropsType
	image?: string
}

function LoginLayout({children, showBackBtn, title, desc, Icon, image}: Props) {
	return (
		<div className="login">
			<div className="login-logo">
				<LogoSvg className="login-logo-icon" />
				<div className="login-logo-title">{APP_NAME_FA}</div>
			</div>
			<div className="login-box">
				{showBackBtn && (
					<Button className="login-box-back" desktopType="ghost-on-surface-first" desktopIsSquare escapeStart onClick={router.back}>
						<LineArrowRightSvg />
					</Button>
				)}
				{Icon ? <Icon className="login-box-icon" /> : image && <Image className="login-box-icon" src={image} resize={{size: null, aspectRatio: null}} />}
				{title && <div className="login-box-title">{title}</div>}
				{desc && <div className="login-box-desc">{desc}</div>}
				{children}
			</div>
		</div>
	)
}

export default LoginLayout
