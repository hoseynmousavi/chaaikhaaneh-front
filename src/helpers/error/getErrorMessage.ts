import REGEX from "constant/general/REGEX"
import type {RequestServerErrorType} from "types/RequestTypes"

function getErrorMessage({data, status: resStatus}: RequestServerErrorType) {
	const {message, error, status, detail} = data || {}
	const showMessage = message?.toString?.() ?? ""
	const showError = error?.toString?.() ?? ""
	const showStatus = status?.toString?.() ?? ""
	const showDetail = detail?.toString?.() ?? ""

	let msg: string | undefined
	if (showMessage && REGEX.PERSIAN_CHARACTER_REGEX.test(showMessage)) msg = showMessage
	else if (showError && REGEX.PERSIAN_CHARACTER_REGEX.test(showError)) msg = showError
	else if (showStatus && REGEX.PERSIAN_CHARACTER_REGEX.test(showStatus)) msg = showStatus
	else if (showDetail && REGEX.PERSIAN_CHARACTER_REGEX.test(showDetail)) msg = showDetail
	else if (showMessage) msg = showMessage
	else if (showError) msg = showError
	else if (showStatus) msg = showStatus
	else if (showDetail) msg = showDetail
	else if (resStatus >= 500 && resStatus < 600) msg = `مشکلی در زیرساختمون داریم (${resStatus})، لطفا مجدداً تلاش کنید.`

	return msg || "خطایی رخ داد؛ مجدداً تلاش کنید."
}

export default getErrorMessage
