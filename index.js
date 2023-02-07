/* track user scroll position and highlight the lateral menu element that is being viewed */
const sections = document.querySelectorAll('.section');
const navLi = document.querySelectorAll('#menu_lateral a');

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
