import useChangePassword from "context/auth/hooks/useChangePassword"
import getTextConstant from "helpers/general/getTextConstant"
import getToastConstant from "helpers/general/getToastConstant"
import router from "helpers/router/router"
import toastManager from "helpers/theme/toastManager"
import FingerScanSvg from "media/svg/FingerScanSvg"
import LineArrowRightSvg from "media/svg/LineArrowRightSvg"
import {useState} from "react"
import type {InputChangeOutputType} from "types/InputType"
import Button from "views/components/button/Button"
import Input from "views/components/input/Input"

function UserMenuModalChangePassword({back}: {back: () => void}) {
	const textConstant = getTextConstant()
	const [values, setValues] = useState<{[key: string]: string}>({old_password: "", new_password: ""})
	const {old_password, new_password} = values
	const isDisable = !old_password || !new_password
	const {changePassword, isLoading} = useChangePassword()

	function submit() {
		changePassword({new_password, old_password}).then(() => {
			router.back()
			const toastConstant = getToastConstant()
			toastManager.addToast({message: toastConstant.passwordChanged, type: "SUCCESS"})
		})
	}

	function onChange({name, value}: InputChangeOutputType) {
		setValues({...values, [name]: value})
	}

	return (
		<div className="user-menu-logout">
			<Button mobileType="ghost-on-surface-first" mobileSize="small" mobileIsRounded mobileIsSquare className="user-menu-logout-back" onClick={back}>
				<LineArrowRightSvg />
				<div>{textConstant.back}</div>
			</Button>
			<div className="user-menu-logout-title">{textConstant.changePass}</div>
			<div className="user-menu-logout-desc">{textConstant.changePassDesc}</div>
			<Input
				className="user-menu-pass-input"
				isDisable={isLoading}
				onSubmit={submit}
				disableSubmit={isDisable}
				Icon={FingerScanSvg}
				name="old_password"
				onChange={onChange}
				label={textConstant.enterOldPass}
				type="password"
				ltr
				showClear
			/>
			<Input
				className="user-menu-pass-input"
				isDisable={isLoading}
				onSubmit={submit}
				disableSubmit={isDisable}
				Icon={FingerScanSvg}
				name="new_password"
				onChange={onChange}
				label={textConstant.enterNewPass}
				type="password"
				ltr
				showClear
			/>
			<Button mobileIsFullWidth onClick={submit} isLoading={isLoading} isDisable={isDisable}>
				{textConstant.submit}
			</Button>
		</div>
	)
}

export default UserMenuModalChangePassword
