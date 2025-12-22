import {serverReq} from "ContextWrapper"

type RetrieveInitialStateProps<S> = {key: ""; initialState: S}

function retrieveInitialState<S>(argument: RetrieveInitialStateProps<S>): S {
	const {key, initialState} = argument
	// @ts-expect-error hello
	const initialStateInServer = serverReq?.data?.[key] as S | undefined
	if (initialStateInServer) return initialStateInServer
	else if (typeof window !== "undefined" && window.serverData?.[key]) return window.serverData?.[key]
	else return initialState
}

export default retrieveInitialState
