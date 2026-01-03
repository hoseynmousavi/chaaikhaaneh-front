import LOCAL_STORAGE_VALUES from "constant/storage/LOCAL_STORAGE_VALUES"

function getToken({useRefreshToken, withoutTokenType}: {useRefreshToken?: boolean; withoutTokenType?: boolean} = {}) {
	if (typeof window !== "undefined") {
		const token = localStorage.getItem(useRefreshToken ? LOCAL_STORAGE_VALUES.ACCOUNT.refresh_token : LOCAL_STORAGE_VALUES.ACCOUNT.token)
		return withoutTokenType && token ? token.split(" ")[1] : token
	} else {
		return ""
	}
}

export default getToken
