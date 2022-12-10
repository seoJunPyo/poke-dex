export const renderNumber = (id: number) => {
	const digits = 3;
	const numberString = id.toString();

	if (numberString.length >= digits) {
		return numberString;
	}

	let result: string = '';

	for (let i = 0; i < digits - numberString.length; i++) {
		result += '0';
	}

	return result + numberString;
};
