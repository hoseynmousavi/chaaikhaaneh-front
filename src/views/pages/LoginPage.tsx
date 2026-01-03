import IMAGES from "constant/images/IMAGES"
import useLogin from "context/auth/hooks/useLogin"
import getTextConstant from "helpers/general/getTextConstant"
import {useState} from "react"
import type {InputChangeOutputType} from "types/InputType"
import Button from "views/components/button/Button"
import Input from "views/components/input/Input"
import LoginLayout from "views/components/login/LoginLayout"

function LoginPage() {
	const textConstant = getTextConstant()
	const [values, setValues] = useState({username: "", password: ""})
	const {username, password} = values
	const disableSubmit = !username || !password
	const {login} = useLogin()
	const [isLoading, setIsLoading] = useState(false)

	function onChange({name, value}: InputChangeOutputType) {
		setValues({...values, [name]: value})
	}

	function onSubmit() {
		setIsLoading(true)
		login({username, password}).catch(() => setIsLoading(false))
	}

	return (
		<LoginLayout title={textConstant.loginSignup} desc={textConstant.loginSignupDesc} image={IMAGES.login.lock}>
			<Input
				className="login-input username"
				name="username"
				validation="username"
				placeholder={textConstant.usernamePlaceholder}
				label={textConstant.username}
				disableSubmit={disableSubmit}
				onSubmit={onSubmit}
				showClear
				focusOnMountDesktop
				onChange={onChange}
				ltr
				autoComplete="off"
				isDisable={isLoading}
			/>
			<Input
				className="login-input"
				name="password"
				type="password"
				label={textConstant.password}
				disableSubmit={disableSubmit}
				onSubmit={onSubmit}
				showClear
				onChange={onChange}
				ltr
				minLength={8}
				autoComplete="off"
				isDisable={isLoading}
			/>
			<Button className="login-btn" mobileIsFullWidth onClick={onSubmit} isLoading={isLoading} isDisable={disableSubmit}>
				<div>{textConstant.enter}</div>
			</Button>
		</LoginLayout>
	)
}

export default LoginPage
