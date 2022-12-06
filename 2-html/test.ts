import parse from "./html";

const test = 'qwe <a a1="v1" a2> asd <closed cz="czd" /> <b b1="v1"> zxc </b> wer <c c1="v1"> sdf </c> xcv </a> ert';
console.log('Tested HTML:', test);
console.log(JSON.stringify(parse(test), null, '\t'));