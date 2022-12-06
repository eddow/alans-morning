import { from_decimal, to_decimal } from "./base";

const test_dev = [5, 1, 6, 0, 3, 6, 2], base = 7,
	decimal = to_decimal(base, test_dev),
	result_dev = from_decimal(base, decimal);

console.log('Decimal', decimal);
console.log('Retrieved', result_dev);