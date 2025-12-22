import ENVS from "constant/general/ENVS"
import {ENV_CONSTANT} from "helpers/general/ENV_CONSTANT"

const domain = {[ENVS.PRODUCTION]: "https://www.chaaikhaaneh.ir"}

const api_server = {[ENVS.PRODUCTION]: "https://api.chaaikhaaneh.ir"}

const o_auth_env_server = {[ENVS.PRODUCTION]: "https://accounts.chaaikhaaneh.ir"}

const cdn_server = {[ENVS.PRODUCTION]: "https://cdn.chaaikhaaneh.ir"}

export const DOMAIN_URL = domain[ENV_CONSTANT]
export const SERVER_URL = api_server[ENV_CONSTANT]
export const O_AUTH_SERVER_URL = o_auth_env_server[ENV_CONSTANT]
export const CDN_URL = cdn_server[ENV_CONSTANT]
