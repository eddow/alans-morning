import BST, { type Pair } from "../1-bst/bst";

type TPair = Pair<number, any>;

function generateTestData(count: number, max: number): number[] {
	let rv: number[] = [];
	while(count--) rv[count] = Math.floor(Math.random()*max);
	return rv;
}

function keys(lst: Iterable<TPair>): number[] {
	let rv = [];
	for(const p of lst)  rv.push(p.key);
	return rv;
}

//const testKeys = generateTestData(10, 20);
const testKeys = [2, 6, 6, 18, 10, 14, 12, 0, 9, 19];
const testArray = testKeys.map((key, ndx)=> ({key, value: '#'+ndx}));

//console.log(testKeys);

let bst = new BST(testArray);

console.log(bst.debugPrint());
//console.log(testKeys.sort((a,b)=> a-b));
console.log('Original keys', Array.from(bst).map(p=> p.key));
bst.insert(6, 'six');
bst.insert(13, 'thirteen');
console.log('After insertion', Array.from(bst));
bst.unset(6);
console.log('Key `6` was removed', Array.from(bst).map(p=> p.key));
console.log('#13:', bst.get(13));
console.log(bst.debugPrint());