
$(() => {
    $('.menu').addClass('show')
    const $menu = $('body #menu');
    async function fetchData() {
        try {
            const response = await fetch('./DataNew.json');
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    const renderSubMenu = (submenu) => {
        const innermenu = submenu.map(item => {
            return `<li data-description="${item.Description}">
            <a href="#">${item.Name}</a>
            </li>`
        })
        setTimeout(() => {
            const ulSubmenu = document.querySelectorAll("ul.submenu");
            ulSubmenu.forEach((ul) => {
                ul.innerHTML = ul.innerHTML.replace(/,/g, "");
            });
        }, 500)
        return innermenu
    }
    // * git sub sub menu items <li></li> * //
    // const renderSubSubMenu = (subMenuItems) => {
    //     const subMenuLi = subMenuItems.map(subsubItem => {
    //         return `<li class="${subsubItem.Name?.indexOf(' ') >= 0 ? subsubItem.Name.replace(/\s+/g, "") : subsubItem.Name}">
    //         <a href="#"> ${subsubItem.Name}</a>
    //         </li>`
    //     })
    //     return subMenuLi
    // }
    fetchData().then(data => {

        $('.menu-header').append(
            ` <img class="avatar" src="${data.logo}" alt="" /><h2>${data.NamePlayer}</h2>`
        ) // * header
        $('.menuTitle').append(data.NameMenu)//** render menu title 
        //* append main menu items *//
        data.Data.forEach((item, index) => {
            $menu.append(`
            <li class="${index === 0 ? 'active' : ''}" data-name="${item.Name.replace(/\s+/g, "")}" data-description="${item.Description}">
                <a href="#">${item.Name}</a>
            </li>
        `);
            //* append SubMenu *//
            $('.menu-body').append(`
                    <ul class="submenu ${item.Name.replace(/\s+/g, "")}">
                        ${renderSubMenu(item.SubMenu)}
                    </ul>
            `)
            //* append sub sub menu if it there *//
            // if (item.SubMenu) {
            //     item.SubMenu.map(subMenuItem => {
            //         if (subMenuItem.SubMenu) {
            //             const ulContent = `<ul class="submenu subSubMenu  ${subMenuItem.Name?.indexOf(' ') >= 0 ? subMenuItem.Name.replace(/\s+/g, "") : subMenuItem.Name}"
            //             >${renderSubSubMenu(subMenuItem.SubMenu)}</ul>`

            //             $('.menu-body').append(ulContent)
            //         }
            //     })
            // }
        })

        const $globalLinks = $menu.find('> li > a');
        let focusIndex = 0;
        let submenuOpen = false;
        let $subMenu = null;
        let $subLinks = null;
        let focusIndexSubmenu = 0;
        let submenuOpened = false;

        // let SubsubmenuOpen = false;
        // let Sub$subMenu = null;
        // let Sub$subLinks = null;
        // let SubfocusIndexSubmenu = 0;
        // let SubsubmenuOpened = false;


        let menuItems = null
        let firstItem = null
        let lastItem = null
        let activeItem = null

        $menu.find('li.active').focus();
        $(document).on('keydown', function (event) {
            switch (event.code) {
                case 'ArrowUp':
                    event.preventDefault();
                    if (!submenuOpen) {
                        focusIndex = Math.max(0, focusIndex - 1);
                    } else {
                        focusIndexSubmenu = Math.max(0, focusIndexSubmenu - 1);
                    }
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (!submenuOpen) {
                        focusIndex = Math.min($globalLinks.length - 1, focusIndex + 1);
                    } else {
                        focusIndexSubmenu = Math.min($subLinks.length - 1, focusIndexSubmenu + 1);
                    }
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (!submenuOpen) {
                        if ($menu.find('li.active').length) {
                            //* sectionName / subMenu */
                            let sectionName = $menu.find('li.active').data('name');
                            //*  show selected item data 
                            console.log('sectionName: ', $menu.find('li.active').data('name'))
                            console.log('description: ', $menu.find('li.active').data('description'))
                            //* subMenu
                            $subMenu = $(`.submenu.${sectionName}`);
                            $subLinks = $subMenu.find('> li > a');
                            $globalLinks.eq(focusIndex).parent().removeClass('active');
                            $subLinks.parent().removeClass('active');
                            focusIndexSubmenu = 0;
                            submenuOpened = true;
                            submenuOpen = true;
                            $subMenu.addClass('show');
                            $menu.addClass('hide');
                            $subLinks.eq(focusIndexSubmenu).parent().addClass('active');
                        }
                    } else {
                        console.log('You pressed enter within a submenu.', $subMenu.find('li.active'));
                        console.log("subMenu", $subMenu.find('li.active')[0].attributes[0].value);
                        const Val = $subMenu.find('li.active')[0].attributes[0].value
                        if (Val === 'Red') {
                            console.log('red:', Val)
                            $('.menu').addClass('redMenu')
                            $('.menu').removeClass('Green')
                        } else if (Val === 'Default') {
                            $('.menu').removeClass('Green')
                            $('.menu').removeClass('redMenu')
                            console.log('default:', Val)
                        } else if (Val === 'Green') {
                            $('.menu').removeClass('redMenu')
                            $('.menu').addClass('Green')
                            console.log('Green:', Val)
                        }

                    }
                    break;
                case 'Backspace':
                    event.preventDefault();
                    if (submenuOpened) {
                        $subMenu.removeClass('show');
                        $menu.removeClass('hide');
                        $subLinks.parent().removeClass('active');
                        focusIndexSubmenu = 0;
                        submenuOpened = false;
                        submenuOpen = false;
                        $menu.find('li.active').removeClass('active');
                        $globalLinks.eq(focusIndex).parent().addClass('active');
                        //* ***  ** */
                        Sub$subMenu = $(`.subSubMenu.${sectionName} `);
                        Sub$subLinks = $subMenu.find('> li > a');
                        $globalLinks.eq(focusIndex).parent().removeClass('active');
                        Sub$subLinks.parent().removeClass('active');
                        SubfocusIndexSubmenu = 0;
                        SubsubmenuOpened = true;
                        SubsubmenuOpen = true;
                        Sub$subMenu.addClass('show');
                        $menu.addClass('hide');
                        SubsubLinks.eq(focusIndexSubmenu).parent().addClass('active');

                    } else {
                        $globalLinks.parent().removeClass('active');
                        focusIndex = 0;
                        submenuOpen = false;
                    }
                    break;
                case 'Escape':
                    $('.menu').removeClass('show')
                    $('.menu').addClass('hide')
                    break;
                case 'KeyM':
                    $('.menu').removeClass('hide')
                    $('.menu').addClass('show')
                    break;
            }

            const menuList = document.querySelector(".menu-body ul.show");
            if (menuList) {
                menuItems = menuList.getElementsByTagName("li");
                firstItem = menuItems[0];
                lastItem = menuItems[menuItems.length - 1];
                for (index in menuItems) {
                    if (menuItems[index]?.classList?.contains('active')) {
                        activeItem = menuItems[index]
                    }
                }
                //* moving
                if (event.key === "ArrowDown" && activeItem !== lastItem) {
                    event.preventDefault();
                    if (activeItem.nextElementSibling.offsetTop > menuList.scrollTop + menuList
                        .clientHeight) {
                        menuList.scrollTop = activeItem.nextElementSibling.offsetTop - menuList
                            .clientHeight;
                        // console.log(activeItem.nextElementSibling.offsetTop, menuList
                        //     .clientHeight);
                    }
                    // console.log(activeItem.nextElementSibling);
                    activeItem.nextElementSibling.focus();
                } else if (event.key === "ArrowUp" && activeItem !== firstItem) {
                    event.preventDefault();
                    if (activeItem.previousElementSibling.offsetTop < menuList.scrollTop) {
                        menuList.scrollTop = activeItem.previousElementSibling.offsetTop;
                    }
                    activeItem.previousElementSibling.focus();
                }
            }

            $globalLinks.parent().removeClass('active');

            if (!submenuOpen) {
                $globalLinks.eq(focusIndex).parent().addClass('active');
                const activeDescription = $('body li.active').data('description');
                $('.menu-footer p').text(activeDescription);
            }

            if (submenuOpened) {
                $subLinks.parent().removeClass('active');
                $subLinks.eq(focusIndexSubmenu).parent().addClass('active');
            }
        });
    }).catch(error => console.error(error));
    //* draggable
    $(function () {
        $('.draggable-item').draggable({
            stop: function (event, ui) {
                var newPosition = ui.position;
                console.log('New position:', newPosition);
                // Perform any further actions with the new position here
            },
            containment: "window",
            handle: ".adjustment-line"
        });
        $('.pcr-app').append('<div class="color-adjustment-line"></div>')
        $('.pcr-app').draggable({

            stop: function (event, ui) {
                var newPosition = ui.position;
                console.log('New position:', newPosition);
                // Perform any further actions with the new position here
            },
            containment: "window",
            handle: ".color-adjustment-line"
        });
    });
})
//*     pickr *** //
$(document).ready(function () {
    const pickr = Pickr.create({
        el: "#color_input",
        theme: "nano",
        components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
                hex: false,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: true,
                save: true,
            },
        },
    });
    //change the color of the main div when color changes
    pickr.on("change", function (e) {
        document.documentElement.style.setProperty('--primary-hue', e.toRGBA()[0]);
        document.documentElement.style.setProperty('--secondary-hue', e.toRGBA()[1]);
        document.documentElement.style.setProperty('--accent-blue', e.toRGBA()[2]);
        document.documentElement.style.setProperty('--opacity', e.toRGBA()[3]);
    }).on('save', (color, instance) => {
        console.log('Event: "save"', color, instance);
        pickr.hide()
    })
});

//* Alert
$('.showALert').click(() => {
    $('.labelAlert').addClass('show')
    $('.labelAlert').removeClass('hide')
    setTimeout(() => {
        $('.labelAlert').addClass('hide')
    }, 3000)
})

$('.showModal').click(() => {
    $('.modal-window').addClass('show')
    $('.modal-window').removeClass('hide')
})
$('.modal-close').click(() => {
    $('.modal-window').addClass('hide')
    $('.modal-window').removeClass('show')
})
choseFont = () => {
    document.documentElement.style.setProperty('--font', 'Tajawal')
    //* Font available Rubik  / Inter
}