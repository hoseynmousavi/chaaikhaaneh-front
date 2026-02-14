import type {AuthActionType, AuthStateType} from "context/auth/AuthType"
import type {ScreenStateType} from "context/screen/screenType"
import type {Dispatch, SetStateAction} from "react"
import type {RedisClientType} from "redis"
import type {DataShareProps} from "request/dataShareManager"
import type {RefreshTokenProps} from "request/refreshTokenManager"
import type {AlertModalType} from "types/AlertModalType"
import type ToastType from "types/ToastType"
import type {PrecacheEntry} from "workbox-precaching"

declare global {
	interface Window {
		authState?: AuthStateType
		authDispatch?: Dispatch<AuthActionType>
		screenState?: ScreenStateType
		screenSetState?: Dispatch<SetStateAction<ScreenStateType>>

		memoryHistoryStack: Array<{id: null | string; location: string}>
		sessionHistoryStack: Array<{id: null | string; location: string}>
		routerPushState: ({id, data}: {id: string; data: string}, arg: string, url: string) => void
		routerReplaceState: ({id, data}: {id: string; data: string}, arg: string, url: string) => void

		refreshToken: (props: RefreshTokenProps) => void
		refreshTokenTimer?: ReturnType<typeof setTimeout>
		tokenRefreshed: () => void

		openAlertModal: (props: AlertModalType) => void

		dataShare: (props: DataShareProps) => void

		serverData?: {[key: string]: any}

		pushBarColor?: ({barColor: string}) => void
		popBarColor?: () => void

		resetData?: (props: {isAfterLogin: boolean}) => void

		svgs?: Record<string, number>

		scheduler: {yield: () => Promise<void>}

		addToast: (props: ToastType) => void

		__WB_MANIFEST: Array<PrecacheEntry>
	}

	namespace globalThis {
		var redisClient: RedisClientType | undefined
	}

	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "production" | "development"
			REACT_APP_VERSION: string
			SSR_PORT: string

			REACT_APP_DOMAIN_URL?: string
			MOCK_REDIS?: string
			REDIS_URL?: string
			REDIS_DB?: string
			REDIS_PASSWORD?: string
			API_BASE_URL?: string
		}
	}
}
