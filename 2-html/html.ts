export class ParseError extends Error {}

export interface HtmlNode {
	tagName: string;
	attributeMap: Record<string, string>;
	text: string;
	children: HtmlNode[];
}

interface Reader {
	source: string;
}

function consume(rdr: Reader, rex: RegExpExecArray): string {
	const rv = rdr.source.substring(0, rex.index);
	rdr.source = rdr.source.substring(rex.index + rex[0].length).trimStart();
	return rv;
}

function parseNodeContent(rdr: Reader, end: RegExp, out: HtmlNode) {
	let open: RegExpExecArray, close: RegExpExecArray;
	open = /<(\w+)/g.exec(rdr.source);
	close = end.exec(rdr.source);
	while(close && open && open.index < close.index) {
		let attr: RegExpExecArray;
		const attributeMap: Record<string, string> = {};
		out.text += consume(rdr, open);
		while(attr = /^(\w[^\/>=\s]*)(:?\s*=\s*"(.*?)")?/g.exec(rdr.source)) {
			consume(rdr, attr);
			attributeMap[attr[1]] = attr[3] === undefined ? null : attr[3];
		}
		let tagEnd = /\/?>/.exec(rdr.source)
		if(!tagEnd)
			throw new ParseError(`Tag "${open[1]}" at ${open.index} finishes opening with a '>' or '/>`);
		consume(rdr, tagEnd);
		const newNode: HtmlNode = {
			tagName: open[1],
			attributeMap,
			text: '',
			children: []
		};
		out.children.push(newNode);
		if(tagEnd[0] == '>')
			parseNodeContent(rdr, new RegExp(`<\/${open[1]}>`), newNode);
		open = /<(\w+)/g.exec(rdr.source);
		close = end.exec(rdr.source);
	}
	if(!close)
		throw new ParseError(`Tag "${out.tagName}" not closed`);
	out.text += consume(rdr, close);
}

export default function parseHTML(source: string): HtmlNode {
	const rv: HtmlNode = {tagName: 'DOCUMENT', attributeMap: {}, text: '', children: []};
	parseNodeContent({source}, /$/, rv);
	return rv;
}