function getCountryPhone(phone: string) {
	if (phone.startsWith("0")) return phone.replace("0", "+98")
	else if (phone.startsWith("98")) return phone.replace("98", "+98")
	else return phone
}

export default getCountryPhone
