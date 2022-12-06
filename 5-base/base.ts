export function to_decimal(base: number, base_number: number[]): number {
	return base_number.reverse().reduce((p, c)=> base * p + c);		//`.reverse()` for little-endian version
}

export function from_decimal(base: number, decimal_number: number) {
	const rv = [];
	while(decimal_number) {
		rv.push(decimal_number % base);
		decimal_number = Math.floor(decimal_number / base);
	}
	return rv;
}