let definitions = {};
export function lussmain(thislines) {
    let tlines = thislines;
    let out = "";
    let lastcondition = false;
    let incon = false;
    for (let ein = 0; ein < tlines.length; ein++) {tlines[ein] = tlines[ein].trimStart().replace("\r", "");}
    for (let ein = 0; ein < tlines.length; ein++) {
        let line = tlines[ein].trimStart().replace("\r", "");
        let arg = line.split(" ");
        let cmd = arg[0];
        function editLine(linecontent) {
            tlines[ein] = linecontent.trimStart();
            line = linecontent.trimStart();
            arg = linecontent.trimStart().split(" ");
            cmd = arg[0];
        }
        function itsInString(variable) {
            let desen = /`.*?`/g;
            let eslesmeler = line.match(desen);
            if (eslesmeler) {
                for (let i = 0; i < eslesmeler.length; i++) {
                    eslesme=eslesmeler[i]
                    if(eslesme.slice(1, eslesme.length-1)===variable) {
                        return true
                    }
                }
            }
            desen = /'.*?'/g;
            eslesmeler = line.match(desen);
            if (eslesmeler) {
                for (let i = 0; i < eslesmeler.length; i++) {
                    eslesme=eslesmeler[i]
                    if(eslesme.slice(1, eslesme.length-1)===variable) {
                        return true
                    }
                }
            }
            desen = /".*?"/g;
            eslesmeler = line.match(desen);
            if (eslesmeler) {
                for (let i = 0; i < eslesmeler.length; i++) {
                    eslesme=eslesmeler[i]
                    if(eslesme.slice(1, eslesme.length-1)===variable) {
                        return true
                    }
                }
            }
            return false;
        }
        function delLine() {
            line = "";
        }
        if (cmd=="@else") {
            lastcondition = !lastcondition;
            incon = true;
            delLine();
            continue;
        }
        if (line == "end" || line == "###" ) {
            incon = false;
            delLine()
            continue;
        }
        if ((incon == true && lastcondition==false)) {
            delLine();
            continue;
        }
        let matchs;
        matchs = line.match(/\$randomColor/g);
        if (matchs) {
            for (let thindex = 0; thindex < matchs.length; thindex++) {
                const th = matchs[thindex];
                const randomColor = Math.floor(Math.random()*16777215).toString(16);
                const hexColor = "#" + "0".repeat(6 - randomColor.length) + randomColor;
                editLine(line.replace(th, hexColor));
            }
        }
        for (let key in definitions) {
            if (definitions.hasOwnProperty(key)) {
                matchs = line.match(eval("/\\$"+key+"/g"));
                if (matchs) {
                    for (let thindex = 0; thindex < matchs.length; thindex++) {
                        const th = matchs[thindex];
                        editLine(line.replace(th, definitions[key]));
                    }
                }
            }
        }
        matchs = line.match(/e\(.*?\)/g);
        if (matchs) {
            for (let thindex = 0; thindex < matchs.length; thindex++) {
                const th = matchs[thindex];
                if(!itsInString(th)){
                    editLine(line.replace(th, eval(th.slice(2, th.length-1))))
                }
            }
        }
        matchs = line.match(/gs\$.*?\(.*?\)/g);
		if (matchs) {
			for (let thindex = 0; thindex < matchs.length; thindex++) {
				const th = matchs[thindex];
                const thselector = th.split("(")[0].replace(/^gs\$/, "").trimEnd().trimStart();
                const thstyle = th.split("(").slice(1).join("(").slice(0, -1).trimEnd().trimStart();
                editLine(line.replace(th, eval("window.getComputedStyle(document.querySelector(\""+thselector+"\"))."+thstyle).toString()))
			}
		}
		matchs = line.match(/random\(.*?\)/g);
		if (matchs) {
			for (let thindex = 0; thindex < matchs.length; thindex++) {
				const th = matchs[thindex];
                const thcon = th.slice(7, th.length - 1);
				editLine(line.replace(th, (Math.floor(Math.random() * Number(thcon.split(",")[1].trimStart().trimEnd())) + Number(thcon.split(",")[0].trimStart().trimEnd())).toString()));
			}
		}
		matchs = line.match(/date\(.*?\)/g);
		if (matchs) {
			for (let thindex = 0; thindex < matchs.length; thindex++) {
				const th = matchs[thindex];
				if (th == "date()") {
					editLine(line.replace(th, Date().toString()))
				} else {
					editLine(line = line.replace(th, eval("new Date().get" + th.slice(5, th.length - 1).charAt(0).toUpperCase() + th.slice(5, th.length - 1).slice(1) + "()")))
				}
			}
		}
		matchs = line.match(/js\{.*?\}/g);
		if (matchs) {
			for (let thindex = 0; thindex < matchs.length; thindex++) {
				const th = matchs[thindex];
				editLine(line.replace(th, eval(th.slice(3, -1))))
			}
		}
		matchs = line.match(/upper\(.*?\)/g);
		if (matchs) {
			for (let thindex = 0; thindex < matchs.length; thindex++) {
				const th = matchs[thindex];
				editLine(line.replace(th, th.slice(6, th.length - 1).toUpperCase()))
			}
		}
        matchs = line.match(/lower\(.*?\)/g);
		if (matchs) {
			for (let thindex = 0; thindex < matchs.length; thindex++) {
				const th = matchs[thindex];
				editLine(line.replace(th, th.slice(6, th.length - 1).toLowerCase()))
			}
		}
		matchs = line.match(/\$\[.*?\]/g);
		if (matchs) {
			for (let thindex = 0; thindex < matchs.length; thindex++) {
				const th = matchs[thindex];
				editLine(line.replace(th, "calc("+th.slice(2, th.length - 1)+")"))
			}
		}
		matchs = line.match(/#rgb\(.*?\)/g);
		if (matchs) {
			for (let thindex = 0; thindex < matchs.length; thindex++) {
				const th = matchs[thindex];
                const thl = th.slice(5, -1).split(",");
                red = Math.max(0, Math.min(255, Number(thl[0])));
                green = Math.max(0, Math.min(255, Number(thl[1])));
                blue = Math.max(0, Math.min(255, Number(thl[2])));
                const redHex = red.toString(16).padStart(2, '0');
                const greenHex = green.toString(16).padStart(2, '0');
                const blueHex = blue.toString(16).padStart(2, '0');
                const hexColor = `#${redHex}${greenHex}${blueHex}`;
				editLine(line.replace(th, hexColor.toUpperCase()))
			}
		}
        matchs = line.match(/\(.*?\?.*?\:.*?\)/g);
		if (matchs) {
			for (let thindex = 0; thindex < matchs.length; thindex++) {
				const th = matchs[thindex];
                if(!itsInString(th)){
                    /* const thcon = th.slice(1, th.length-1);
                    const condition = eval(thcon.split("?")[0]);
                    const ilkDeger = thcon.split("?")[1].split(":")[0]
                    const ikinciDeger = thcon.split("?")[1].split(":")[1] */
                    editLine(line.replace(th, eval(th.slice(1, th.length-1))))
                }
			}
		}
        matchs = line.match(/each\(.*?\{/g);
        if (matchs) {
            let tmatchs = tlines.join("\n").match(/each\([\s\S]*?\{[\s\S]*?\}\)/g);
            if (tmatchs) {
                for (let thindex = 0; thindex < tmatchs.length; thindex++) {
                    const th = tmatchs[thindex];
                    const thcon = th.slice(5, -1);
                    const thselarray = thcon.split("{")[0].trimEnd().trimStart().split("|");
                    thselarray.forEach(css => {
                        const modifiedTh = css+"{" + th.split("{").slice(1).join("{").slice(0, -1);
                        out += lussmain(modifiedTh.split("\n"));
                    });
                    tlines = tlines.join("\n").replace(th, "").split("\n")
                    delLine();
                }
            }
            delLine();
        }
        matchs = line.match(/.*?::inner.*?/g);
        if (matchs) {
            const thselector = line.split("::inner")[0];
            let tmatchs = tlines.join("\n").match(eval("/"+line.replace("{", "")+"[\\s\\S]*?\\{[\\s\\S]*?\\}/g"));
            if (tmatchs) {
                for (let thindex = 0; thindex < tmatchs.length; thindex++) {
                    let th = tmatchs[thindex];
                    const thcon = th.split("{")[1].slice(0, -1);
                    const thincon = thcon.match(/content\s*?:\s*?"[\s\S]*?";|content\s*?:\s*?'[\s\S]*?';/g);
                    if (thincon) {
                        document.querySelectorAll(thselector).forEach(element => {
                            const incon = eval(thincon[0].split(":").slice(1).join(":"));
                            element.innerHTML = incon;
                        });
                        th=th.replace(thincon[0], "");
                    }
                    tlines = tlines.join("\n").replace(th, th.replace("::inner", " > *")).split("\n");
                }
            }
            line = line.replace("::inner", " > *")
        }
        matchs = line.match(/.*?::outer.*?/g);
        if (matchs) {
            const thselector = line.split("::outer")[0];
            let tmatchs = tlines.join("\n").match(eval("/"+line.replace("{", "")+"[\\s\\S]*?\\{[\\s\\S]*?\\}/g"));
            if (tmatchs) {
                for (let thindex = 0; thindex < tmatchs.length; thindex++) {
                    let th = tmatchs[thindex];
                    const thcon = th.split("{")[1].slice(0, -1);
                    const thincon = thcon.match(/content\s*?:\s*?"[\s\S]*?";|content\s*?:\s*?'[\s\S]*?';|content\s*?:\s*?\`[\s\S]*?\`;/g);
                    if (thincon) {
                        document.querySelectorAll(thselector).forEach(element => {
                            const incon = eval(thincon[0].split(":").slice(1).join(":"));
                            element.outerHTML = incon;
                        });
                        th=th.replace(thincon[0], "");
                    }
                    tlines = tlines.join("\n").replace(th, th.replace("::outer", "")).split("\n");
                }
            }
            line = line.replace("::outer", "")
        }
        matchs = line.match(/interval\(.*?\{/g);
        if (matchs) {
            let tmatchs = tlines.join("\n").match(/interval\([^)]*\{[\s\S]*?\}\)/g);
            if (tmatchs) {
                for (let thindex = 0; thindex < tmatchs.length; thindex++) {
                    const th = tmatchs[thindex];
                    const thcon = th.slice(9, -1);
                    const thsel = thcon.split("{")[0].trimEnd().trimStart().split("$")[0].trimEnd().trimStart();
                    const thms = thcon.split("{")[0].trimEnd().trimStart().split("$")[1].trimEnd().trimStart();
                    const modifiedTh = th.split("{").slice(1).join("{").slice(0, -2).trimStart().trimEnd();
                    setInterval(() => {
                        const targetElement = document.querySelector(thsel);
                        if (targetElement) {
                            const styleContent = lussmain(modifiedTh.split('\n')).trim().replaceAll("\n", "");
                            targetElement.style = styleContent;
                        }
                    }, Number(thms));
                    tlines = tlines.join("\n").replace(th, "").split("\n");
                    delLine();
                }
            }
        }
        switch (cmd) {
            case "@if":
                if (eval(arg.slice(1).join(" ").trimEnd().trimStart().slice(1, arg.slice(1).join(" ").trimEnd().trimStart().length-1))) {
                    lastcondition = true;
                    incon = true;
                } else {
                    lastcondition = false;
                    incon = true;
                }
                delLine();
                break;
            default:
                if(cmd.startsWith("$")){
                    definitions[line.split(":")[0].trimEnd().slice(1)] = line.split(":").slice(1).join(" ").trimStart();
                    delLine();
                } else if(cmd.startsWith("js$")){
                    definitions[line.split(":")[0].trimEnd().slice(2)] = eval(line.split(":").slice(1).join(" ").trimStart()).toString();
                    delLine();
                }
                break;
        }
        out += "\n"+line;
    }
    return out
}
const lussels = document.getElementsByTagName("link");
for (let ein = 0; ein < lussels.length; ein++) {
	const thisLussElement = lussels[ein];
    if (thisLussElement.rel=="luss"&&thisLussElement.href) {
		fetch(thisLussElement.href)
			.then((response) => response.text())
			.then((content) => {
				let styleElement = document.createElement("style");
                styleElement.textContent = lussmain(content.split("\n"));
                document.head.appendChild(styleElement);
			});
	}
}
const scriptels = document.getElementsByTagName("style");
for (let ein = 0; ein < scriptels.length; ein++) {
	const thisStyleElement = scriptels[ein];
    if (thisStyleElement.getAttribute("luss")==null) {continue;}
    if (!thisStyleElement.innerHTML || !thisStyleElement.innerText) {continue;}
    let styleElement = document.createElement("style");
    styleElement.textContent = lussmain(thisStyleElement.innerHTML.toString().split("\n"));
    document.head.appendChild(styleElement);
}
export function luss(content) {
    let styleElement = document.createElement("style");
    styleElement.textContent = lussmain(content.split("\n"));
    document.head.appendChild(styleElement);
}