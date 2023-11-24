import { lussmain } from "https://cdn.jsdelivr.net/gh/sanalzio/-LUSS-@master/luss.js";
let iframe = document.getElementById("myIframe");
let editor2 = document.getElementById("cedi");
editor2.value = `$success : green

p{}

p {
    color: $success;
}

h1 {
    color: $success;
}

div{
    position: relative;
    top: 3rem;
    left: 5rem;
}`;
const re = () => {iframe.contentDocument.documentElement.innerHTML = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <style>\n        html{\n            color-scheme: dark;\n        }\n        #square{\n            width: 3rem;\n            height: 3rem;\n            background: darkorchid;\n        }\n    </style>\n    <style>`+lussmain(editor2.value.split("\n"))+`</style>\n</head>\n<body>\n    <h1 id="header1">{LUSS}</h1>\n    <p id="paragraph">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse minima amet debitis accusantium, quos itaque voluptate blanditiis non soluta, quisquam architecto consequatur. Laudantium consequuntur quisquam iure quis suscipit recusandae explicabo.</p>\n    <div id="square"></div>\n</body>\n</html>\n`;};
re();
let display = document.getElementById("display");
import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js";
import css from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/css.min.js";
hljs.registerLanguage("css", css);
display.innerHTML = hljs.highlight(editor2.value.replaceAll(" ", "&nbsp;"), { language: "css" }).value.replaceAll("\n", "<br>").replaceAll("&amp;nbsp;", "&nbsp;");
editor2.addEventListener("input", () => {
	display.innerHTML = hljs.highlight(editor2.value.replaceAll(" ", "&nbsp;"), { language: "css" }).value.replaceAll("\n", "<br>").replaceAll("&amp;nbsp;", "&nbsp;");
	re();
});
display.style.fontWeight = window.getComputedStyle(editor2).fontWeight;
display.style.fontSize = window.getComputedStyle(editor2).fontSize;
window.addEventListener("resize", () => {
	display.style.fontWeight = window.getComputedStyle(editor2).fontWeight;
	display.style.fontSize = window.getComputedStyle(editor2).fontSize;
});
editor2.addEventListener("scroll", () => {
	display.scrollTop = editor2.scrollTop;
	display.scrollLeft = editor2.scrollLeft;
});

document.addEventListener("keydown", function (event) {
	var textarea = document.querySelector("#cedi");
	if (textarea && event.key === "Tab") {
		event.preventDefault();
		var start = textarea.selectionStart;
		var end = textarea.selectionEnd;
		var textBefore = textarea.value.substring(0, start);
		var textAfter = textarea.value.substring(end);
		var newText = textBefore + "    " + textAfter;
		textarea.value = newText;
		textarea.setSelectionRange(start + 4, start + 4);
        display.innerHTML = hljs.highlight(editor2.value.replaceAll(" ", "&nbsp;"), { language: "css" }).value.replaceAll("\n", "<br>").replaceAll("&amp;nbsp;", "&nbsp;");
        re();
	}
});
