import type {InputValidationType} from "types/InputType"

export const INPUT_VALIDATION_ERROR: Record<InputValidationType, string> = {
	phone: "شماره موبایل وارد شده معتبر نمی‌باشد",
	url: "لینک وارد شده معتبر نمی‌باشد",
	email: "ایمیل وارد شده معتبر نمی‌باشد",
}

export const INPUT_MIN_ERROR = (min: number | undefined) => `این فیلد باید حداقل شامل ${min} کاراکتر باشد.`
