
export interface Pair<K, V> {
	key: K;
	value: V;
}

interface BstNode<K, V> extends Pair<K, V> {
	left?: BstNode<K, V>;
	right?: BstNode<K, V>;
}

function strictlyGt(a, b) {
	return a > b || (a == b && typeof a > typeof b);
}
interface Browser<K,V> {
	obj: BST<K,V>|BstNode<K,V>;
	side: string;
}
function debugPrint(node?: BstNode<string, any>): string {
	if(!node) return '-';
	return '['+debugPrint(node.left)+'] '+node.key.toString()+' ['+debugPrint(node.right)+']';
}
export default class BST<K= any, V=any> implements Iterable<Pair<K,V>> {
	private root?: BstNode<K,V> = undefined;
	constructor(init?: Iterable<Pair<K,V>>) {
		if(init) for(const item of init) this.insert(item.key, item.value);
	}
	private descend(key: K, next?: Browser<K,V>): Browser<K,V> {
		let tester: BstNode<K,V>;
		if(!next) next = {obj: this, side: 'root'};

		while(tester = next.obj[next.side], tester && tester.key !== key)
			next = {
				obj: tester,
				side: strictlyGt(key, tester.key) ? 'right' : 'left'
			};
		return next;
	}
	// Not demanded but I had it done
	set(key: K, value: V): V {
		const ptr = this.descend(key),
			node = ptr.obj[ptr.side];
		if(node) node.value = value;
		else ptr.obj[ptr.side] = {key, value};
		return value;
	}
	insert(key: K, value: V): V {
		const ptr = this.descend(key),
			node = ptr.obj[ptr.side];
		if(node) node.right = {key, value, right: node.right};
		else ptr.obj[ptr.side] = {key, value};
		return value;
	}
	unset(key: K): number {
		let ptr: Browser<K,V> = {obj: this, side: 'root'},
			node: BstNode<K,V>,
			rv = 0;	//return-value
		while(ptr = this.descend(key, ptr), node = <BstNode<K,V>>ptr.obj[ptr.side]) {
			++rv;
			// Quick optimisation cases
			if(!node.right) ptr.obj[ptr.side] = node.left;
			else if(!node.left) ptr.obj[ptr.side] = node.right;
			// BstNode has 2 children - take the left-most child of the right child (arbitrary)
			else if(!node.right.left) {	//In order to avoid using a Browser<K,V>, the first specific case (right-left) is hard-coded
				node.right.left = node.left;
				ptr.obj[ptr.side] = node.right;
			} else {
				let browser = node.right, next: BstNode<K,V>;
				// Only cast here as verified by conditions
				while(next = <BstNode<K,V>>browser.left, next.left) browser = next;
				ptr.obj[ptr.side] = browser.left;
				browser.left = next.right;
				next.right = node.right;
			}
		}
		return rv;
	}
	get(key: K): V | null {
		const ptr = this.descend(key);
		return ptr.obj[ptr.side]?.value;
	}
	has(key: K): boolean {
		const ptr = this.descend(key);
		return !!ptr.obj[ptr.side];
	}
	*[Symbol.iterator]() {
		const toTraverse: BstNode<K,V>[] = [];
		function addRight(node: BstNode<K,V>) {
			for(; node; node = <BstNode<K,V>>node.left)
				toTraverse.unshift(node);
		}
		if(this.root) addRight(this.root)
		while(toTraverse.length > 0) {
			const browser = <BstNode<K,V>>toTraverse.shift();
			yield {key: browser.key, value: browser.value};	//cloning the pair protects from unintended user's faulty behaviour
			if(browser.right) addRight(browser.right);
		}
	}
	debugPrint(): string {
		return debugPrint(<BstNode<string, any>>this.root);
	}
}