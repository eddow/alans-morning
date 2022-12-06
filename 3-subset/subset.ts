// For the few challenge there was, I tried to keep it as short as posible, using all language features available
export default function subset(input: number[]) : number[][] {
	if(!input.length) return [[]];
	const [first, ...recursion] = input, recursed = subset(recursion);
	return [...recursed.map(ss=> [first, ...ss]), ...recursed];
}