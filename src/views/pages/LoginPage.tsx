import IMAGES from "constant/images/IMAGES"
import getTextConstant from "helpers/general/getTextConstant"
import LoginLayout from "views/components/login/LoginLayout"

function LoginPage() {
	const textConstant = getTextConstant()
	return (
		<LoginLayout title={textConstant.loginSignup} desc={textConstant.loginSignupDesc} showBackBtn image={IMAGES.login.lock}>
			salam
		</LoginLayout>
	)
}

export default LoginPage
