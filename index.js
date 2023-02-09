/* track user scroll position and highlight the lateral menu element that is being viewed */
const sections = document.querySelectorAll('.section');
const navLi = document.querySelectorAll('#menu_lateral a');

/* create a navbar based on files insed the artigos directory filenames */
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'artigos');
const files = fs.readdirSync(dir);

files.forEach(file => {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.innerText = file.replace('.txt', '');
    a.href = '#';
    li.appendChild(a);
    document.querySelector('#menu_sup').appendChild(li);
});

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            console.log(section.getAttribute('id'));
            /* check if current is not null */
            if (section.querySelector('h1') != null) {
                current = section.querySelector('h1').innerText;
            }
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.innerText == current) {
            
            if (a.previousElementSibling != null) {
                console.log(a.previousElementSibling);
                if (a.previousElementSibling.classList.contains("show") && a.previousElementSibling != "" && a.previousElementSibling.classList.contains("sub_section_container")) {
                    a.previousElementSibling.classList.add('hide');
                    a.previousElementSibling.classList.remove('show');
                }
            }

            a.classList.add('active');
            /* when a section is activated, all the sub_sections bellow are exibited */

            /* if exist a nextsibling */
            if (a.nextElementSibling != null) {
                a.nextElementSibling.classList.remove('hide');
                a.nextElementSibling.classList.add('show');
            }
            /* if a new section is being view hide last sub_section showed */

        }
    });
});

/* when click in a navLi, scroll to element position based on its title match on section h1*/
navLi.forEach(a => {
    a.addEventListener('click', () => {
        sections.forEach(section => {
            if (section.querySelector('h1').innerText == a.innerText) {
                section.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});


/* 

Padrão para detecção de Titulo de Seção:
#( )?*(A-Za-z)+ *\n --> <div class="section"><h1>Titulo</h1>

Padrão para detecção de Titulo de subSeção:
##( )?*(A-Za-z)+ *\n --> <div class="sub_section"><h2>Titulo</h2>

Padrão para detecção de Titulo de subSeção:
###( )?*(A-Za-z)+ *\n --> <div class="sub_sub_section"><h3>Titulo</h3>

Padrão detecção de referência:
( )*ref\([A-Za-z 1-9]+\)( )+ --> <span class="ref">ref</span>

Padrão detecção de elemento de glossário:
( )*gloss\([A-Za-z 1-9]+\)( )+ --> <span class="glossary">gloss</span>

*/

/* convert txt file to html based on the above system */

/* this function recieve a file path and convert its txt content to html */




function convertToHtml(path) {
    var file = new File(path);
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        var result = reader.result;
        var lines = result.split('\n');
        var html = "";
        var section = false;
        var sub_section = false;
        var sub_sub_section = false;
        
        /* go and read each paragraph */
        for (var i = 0; i < lines.length; i++) {   
            /* check if is a section */
            if (lines[i].match(/^(#( )*(A-Za-z)+ *\n)$/)) {
                if (section) {
                    html += "</div>";
                }
                html += "<div class='section'>";
                html += "<h1>" + lines[i].replace(/#/g, "").replace(/\n/g, "") + "</h1>";
                section = true;
            } else if (lines[i].match(/^(##( )*(A-Za-z)+ *\n)$/)) {
                if (sub_section) {
                    html += "</div>";
                }
                html += "<div class='sub_section'>";
                html += "<h2>" + lines[i].replace(/#/g, "").replace(/\n/g, "") + "</h2>";
                sub_section = true;
            } else if (lines[i].match(/^(###( )*(A-Za-z)+ *\n)$/)) {
                if (sub_sub_section) {
                    html += "</div>";
                }
                html += "<div class='sub_sub_section'>";
                html += "<h3>" + lines[i].replace(/#/g, "").replace(/\n/g, "") + "</h3>";
                sub_sub_section = true;
            } else if (lines[i].match(/^(ref\([A-Za-z 1-9]+\)( )+)$/)) {
                html += "<span class='ref'>" + lines[i].replace(/ref\(/g, "").replace(/\)( )+/g, "") + "</span>";
            } else if (lines[i].match(/^(gloss\([A-Za-z 1-9]+\)( )+)$/)) {
                html += "<span class='glossary'>" + lines[i].replace(/gloss\(/g, "").replace(/\)( )+/g, "") + "</span>";
            } else {
                html += "<p>" + lines[i] + "</p>";
            }
        }
        html += "</div>";
        document.getElementById("content").innerHTML = html;
    };
}

            
