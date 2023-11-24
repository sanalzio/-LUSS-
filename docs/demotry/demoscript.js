let iframe = document.getElementById('myIframe');
let editor2 = document.getElementById("cedi");
editor2.value = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script defer src="https://cdn.jsdelivr.net/gh/sanalzio/-LUSS-@master/luss.js"></script>
</head>
<body>
    <h1>{LUSS}</h1>
</body>
</html>
`;
iframe.contentDocument.documentElement.innerHTML = editor2.value;
let display = document.getElementById("display");
import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js';
import xml from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/xml.min.js';
hljs.registerLanguage("xml", xml);
display.innerHTML = hljs.highlight(editor2.value.replaceAll(" ", "&nbsp;"), {language: 'xml'}).value.replaceAll("\n", "<br>").replaceAll("&amp;nbsp;", "&nbsp;");
editor2.addEventListener("input", () => {
    console.log(hljs.highlight(editor2.value.replaceAll(" ", "&nbsp;"), {language: 'xml'}).value.replaceAll("\n", "<br>").replaceAll("&amp;nbsp;", "&nbsp;"));
    display.innerHTML = hljs.highlight(editor2.value.replaceAll(" ", "&nbsp;"), {language: 'xml'}).value.replaceAll("\n", "<br>").replaceAll("&amp;nbsp;", "&nbsp;");
    iframe.contentDocument.documentElement.innerHTML = editor2.value;
})
display.style.fontWeight=window.getComputedStyle(editor2).fontWeight;
display.style.fontSize=window.getComputedStyle(editor2).fontSize;
window.addEventListener("resize", () => {
    display.style.fontWeight=window.getComputedStyle(editor2).fontWeight;
    display.style.fontSize=window.getComputedStyle(editor2).fontSize;
});
editor2.addEventListener('scroll', () => {
    display.scrollTop = editor2.scrollTop;
    display.scrollLeft = editor2.scrollLeft;
});