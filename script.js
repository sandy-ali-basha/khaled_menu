
$(() => {
    var data = null;
    const $menu = $('body #menu');
    async function fetchData() {
        try {
            const response = await fetch('./DataNew.json');
            data = await response.json();;
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    const renderArrowList = (ArrowListItem) => {
        const innerMenu = ArrowListItem.map((item, index) => {
            return `
             <span class="mySlides" style="display: ${index < 1 ? 'block' : 'none'};" id="${item.Id}">${item.Name} </span>
          `
        })
        return innerMenu
    }

    const renderArrowMix = (ArrowMix, ArrowMinimum) => {
        const spans = [];
        for (let i = ArrowMinimum; i <= ArrowMix; i++) {
            spans.push(`<span class="mySlides" style="display: ${i < 1 ? 'block' : 'none'};" id="${i}">${i} </span>`);
        }
        console.log('spans', spans)
        return spans;
    }
    const renderSubMenu = (submenu) => {
        const innermenu = submenu.map(item => {
            const ItemName = item.Name?.indexOf(' ') >= 0 ? item.Name.replace(/[\s\/]+/g, "") : item.Name;
            return `<li class="${item.Show ? '' : 'hide'}" data-description="${item.Description}" data-name=${ItemName} name="${item.Name}">

            <a href="#">
            ${item.Checked === undefined ? item.Name : `<label for=${ItemName}>${item.Name}</label>`}
            </a>

            ${item.Checked === undefined ? ' ' : `<input id=${ItemName} type="checkbox" ${item.Checked ? 'Checked' : ' '}>`}

            ${item.SubMenu ? '<span>⇒</span>' : ' '}
            
            ${item.ArrowList ? `<div class='leftRightItem' id='${ItemName}'>${renderArrowList(item.ArrowList)}</div>` : ' '}
            
            </li> `
        })
        setTimeout(() => {
            const ulSubmenu = document.querySelectorAll("ul.submenu");
            ulSubmenu.forEach((ul) => {
                ul.innerHTML = ul.innerHTML.replace(/,/g, "");
            });
        }, 500)
        return innermenu
    }

    const renderSubSubMenu = (submenu) => {
        const innermenu = submenu.map(item => {
            const Name = item.Name?.indexOf(' ') >= 0 ? item.Name.replace(/[\s\/]+/g, "") : item.Name;
            return `<li class="${item.Show ? '' : 'hide'}" 
            data-description="${item.Description}" 
            data-name=${Name}
            name="${item.Name}">
            <a href="#">
            ${item.Checked === undefined ? item.Name : `<label for=${Name}>${item.Name}</label>`}
            </a>
            ${item.Checked === undefined ? ' ' : `<input id="${Name}" ${item.Checked ? 'Checked' : ' '} type="checkbox">`}
            ${item.SubMenu ? '<span>⇒</span>' : ' '}
            ${item.ArrowList ? `<div class='leftRightItem' id="${Name}">${renderArrowList(item.ArrowList)}</div>` : ' '}
            ${item.ArrowMix ? `<div class='leftRightItem' id="${Name}">${renderArrowMix(item.ArrowMix, item.ArrowMinimum)}</div>` : ' '}
            </li >`
        })
        setTimeout(() => {
            const ulSubmenu = document.querySelectorAll("ul.subSubMenu");
            ulSubmenu.forEach((ul) => {
                ul.innerHTML = ul.innerHTML.replace(/,/g, "");
            });
        }, 500)
        return innermenu
    }
    fetchData().then(data => {
        $('.menu').addClass('show')
        // * theme * //
        const CurrentTheme = data.Theme

        if (CurrentTheme === 'basic') {
            console.log('red:', CurrentTheme)
            $('.menu').addClass('redMenu')
            $('.menu').removeClass('Green')
        } else if (CurrentTheme === 'Default') {
            $('.menu').removeClass('Green')
            $('.menu').removeClass('redMenu')
            console.log('default:', Val)
        } else if (CurrentTheme === 'modern') {
            $('.menu').addClass('Green')
            $('.menu').removeClass('redMenu')
            console.log('Green:', Val)
        }
        // * append Menu * //
        $('.menu-header').append(
            ` <img class="avatar" src = "${data.logo}" alt = "" /> <h2>${data.NamePlayer}</h2>`
        ) // * header
        $('.menuTitle').append(data.NameMenu)//** render menu title 
        //! append main menu items 
        data.Data.forEach((item, index) => {
            const ItemName = item.Name.replace(/[\s\/]+/g, "");
            $menu.append(`
        <li class="${index === 0 ? 'active' : ''} ${item.Show ? '' : 'hide'}" data-name="${ItemName}" data-description="${item.Description}" name="${item.Name}">
                <a href="#">
                ${item.Checked === undefined ? item.Name : `<label for=${ItemName}>${item.Name}</label>`}
                </a>
                ${item.Checked === undefined ? ' ' : `<input id=${ItemName} type="checkbox" ${item.Checked ? 'Checked' : ''}>`}
                ${item.SubMenu ? '<span>⇒</span>' : ' '}
            </li >
        `);
            //* append SubMenu *//
            $('.menu-body').append(`
        <ul class="submenu ${item.Name.replace(/[\s\/]+/g, "")}" >
            ${renderSubMenu(item.SubMenu)}
                    </ul>
        `)
            //* append sub sub menu if it there *//
            if (item.SubMenu) {
                item.SubMenu.map(subMenuItem => {
                    if (subMenuItem.SubMenu) {
                        const ulContent = `<ul class="submenu subSubMenu ${subMenuItem.Name?.indexOf(' ') >= 0 ? subMenuItem.Name.replace(/[\s\/]+/g, "") : subMenuItem.Name}"
        > ${renderSubSubMenu(subMenuItem.SubMenu)}</ul> `
                        $('.menu-body').append(ulContent)
                    }
                })
            }
        })

        const $globalLinks = $menu.find('> li > a');
        let focusIndex = 0;
        let submenuOpen = false;
        let subSubmenuOpen = false;
        let subSubmenuOpened = false;
        let $subMenu = null;
        let $subSubMenu = null;
        let $subLinks = null;
        let $subSubLinks = null;
        let focusIndexSubmenu = 0;
        let focusIndexSubSubmenu = 0;
        let submenuOpened = false;

        let menuItems = null
        let firstItem = null
        let lastItem = null
        let activeItem = null

        $menu.find('li.active').focus();
        $(document).on('keydown', function (event) {
            switch (event.code) {
                case 'ArrowUp':
                    event.preventDefault();
                    if (!submenuOpen && !subSubmenuOpen) {
                        // menu
                        focusIndex = Math.max(0, focusIndex - 1);
                    } else if (subSubmenuOpen && !submenuOpen) {
                        // sub sub menu
                        focusIndexSubSubmenu = Math.max(0, focusIndexSubSubmenu - 1);
                    } else if (submenuOpen && !subSubmenuOpen) {
                        // sub menu
                        focusIndexSubmenu = Math.max(0, focusIndexSubmenu - 1);
                    }
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (!submenuOpen && !subSubmenuOpen) {
                        // menu
                        focusIndex = Math.min($globalLinks.length - 1, focusIndex + 1);
                    } else if (subSubmenuOpen && !submenuOpen) {
                        // sub sub menu
                        focusIndexSubSubmenu = Math.min($subSubLinks.length - 1, focusIndexSubSubmenu + 1);
                    } else if (submenuOpen && !subSubmenuOpen) {
                        // sub menu
                        focusIndexSubmenu = Math.min($subLinks.length - 1, focusIndexSubmenu + 1);
                    }
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (!submenuOpen && !subSubmenuOpen) {
                        let ItemName = $menu.find('li.active')[0].getAttribute('name')
                        console.log('ItemName:', ItemName)
                        //! show sub menu when press enter in menu

                        if ($menu.find('li.active').length) {
                            //* sectionName / subMenu */
                            let sectionName = $menu.find('li.active').data('name');
                            //*  show selected item data 
                            console.log('sectionName: ', $menu.find('li.active').data('name'))
                            console.log('description: ', $menu.find('li.active').data('description'))
                            //* subMenu
                            $subMenu = $(`.submenu.${sectionName} `);
                            $subLinks = $subMenu.find('> li > a');
                            $globalLinks.eq(focusIndex).parent().removeClass('active');
                            $subLinks.parent().removeClass('active');
                            focusIndexSubmenu = 0;
                            submenuOpened = true;
                            submenuOpen = true;
                            $subMenu.addClass('show');
                            $menu.addClass('hide');
                            $menu.removeClass('show');
                            $subLinks.eq(focusIndexSubmenu).parent().addClass('active');
                        }
                    } else if (submenuOpen && !subSubmenuOpen) {
                        let ItemName = $subMenu.find('li.active')[0].getAttribute('name')
                        console.log('ItemName:', ItemName)
                        //! show sub sub menu when press enter in sub menu

                        let sectionName = $subMenu.find('li.active').data('name');
                        $subSubMenu = $(`.subSubMenu.${sectionName} `);

                        // *check if there is a sub sub ul menu in the dom 
                        if ($subSubMenu.length > 0) {
                            $subSubLinks = $subSubMenu.find('> li > a');
                            $globalLinks.eq(focusIndex).parent().removeClass('active');
                            $subSubLinks.parent().removeClass('active');
                            focusIndexSubSubmenu = 0;
                            submenuOpened = false;
                            submenuOpen = false;
                            subSubmenuOpen = true;
                            subSubmenuOpened = true;
                            console.log('$subSubMenu', $subSubMenu)
                            $subSubMenu.addClass('show');
                            $subSubMenu.removeClass('hide');
                            $subMenu.removeClass('show');
                            $subSubLinks.eq(focusIndexSubmenu).parent().addClass('active');
                        }
                        // * -------- actions on enter a sub menu item ------------
                        let subMenuItem = $subMenu.find('li.active')[0].getAttribute('data-name')

                        const Item = $subMenu.find('li.active')[0]
                        const hasCheckbox = Item.querySelector("input[type='checkbox']") !== null;

                        if (hasCheckbox) {
                            const checkedItem = document.getElementById(subMenuItem).checked;
                            checkedItem ? document.getElementById(subMenuItem).checked = false : document.getElementById(subMenuItem).checked = true
                        }

                        switch (subMenuItem) {
                            case "ChangeMenuColor":
                                pickr.show()
                                //! add your mouse enable function here 
                                break;
                        }
                    } else if (!submenuOpen && subSubmenuOpen) {
                        let ItemName = $subSubMenu.find('li.active')[0].getAttribute('name')
                        console.log('ItemName:', ItemName)
                        // ! -------- actions on enter a sub sub menu item ------------
                        //  item Name 
                        const subSubMenuItem = $subSubMenu.find('li.active')[0].getAttribute('data-name');
                        const SubItem = $subSubMenu.find('li.active')[0]
                        const SubHasCheckbox = SubItem.querySelector("input[type='checkbox']") !== null;
                        if (SubHasCheckbox) {
                            const checkedItem = document.getElementById(subSubMenuItem).checked;
                            checkedItem ? document.getElementById(subSubMenuItem).checked = false : document.getElementById(subSubMenuItem).checked = true
                        }
                        //! /////////////

                        switch (subSubMenuItem) {
                            case "Theme1":
                                $('.menu').addClass('redMenu')
                                $('.menu').removeClass('Green')
                                break;
                            case "Default":
                                $('.menu').removeClass('Green')
                                $('.menu').removeClass('redMenu')
                                break;
                            case "Theme3":
                                $('.menu').removeClass('redMenu')
                                $('.menu').addClass('Green')
                                break;
                        }
                    } else if (submenuOpen && !subSubmenuOpen) {
                        console.log('You pressed enter, submenuOpen && !subSubmenuOpen', $menu.find('li.active')[0].attributes[0].value);
                        //!
                    }

                    break;
                case 'Backspace':
                    event.preventDefault();
                    if (submenuOpened && !subSubmenuOpen) {
                        // back from sub menu
                        $subMenu.removeClass('show');
                        $menu.removeClass('hide');
                        $menu.addClass('show');
                        $subLinks.parent().removeClass('active');
                        focusIndexSubmenu = 0;
                        submenuOpened = false;
                        submenuOpen = false;
                        $menu.find('li.active').removeClass('active');
                        $globalLinks.eq(focusIndex).parent().addClass('active');
                    } else if (!submenuOpened && subSubmenuOpen) {
                        // back from sub sub menu
                        $globalLinks.parent().removeClass('active');
                        focusIndex = 0;
                        $subSubMenu.removeClass('show');
                        $subMenu.addClass('show');
                        $subMenu.removeClass('hide');
                        focusIndexSubmenu = 0;
                        submenuOpen = true;
                        submenuOpened = true;
                        subSubmenuOpen = false;
                        subSubmenuOpened = false;
                        $menu.find('li.active').removeClass('active');
                        $globalLinks.eq(focusIndex).parent().addClass('active');
                    }
                    break;
                case 'Escape':
                    $('.menu').removeClass('show')
                    $('.menu').addClass('hide')

                    $('.menu-body').empty();
                    $('.menu-body').append('<ul id="menu" class="show"></ul>')
                    break;
                case 'KeyM':
                    $('.menu').removeClass('hide')
                    $('.menu').addClass('show')
                    break;
                case 'ArrowRight':
                    plusDivs(1)
                    break;
                case 'ArrowLeft':
                    console.log('ArrowLeft')
                    plusDivs(-1)
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
                            .clientHeight + activeItem.nextElementSibling.clientHeight;
                        activeItem.nextElementSibling.focus();
                    }
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
            // menu
            if (!submenuOpen && !subSubmenuOpened) {
                $globalLinks.eq(focusIndex).parent().addClass('active');
                const activeDescription = $('body li.active').data('description');
                $('.menu-footer p').text(activeDescription);
            }
            // sub menu
            if (submenuOpened && !subSubmenuOpened) {
                $subLinks.parent().removeClass('active');
                $subLinks.eq(focusIndexSubmenu).parent().addClass('active');
            }
            // sub sub menu
            if (subSubmenuOpened && !submenuOpened) {
                $subSubLinks.parent().removeClass('active');
                $subSubLinks.eq(focusIndexSubSubmenu).parent().addClass('active');
            }
        });


        // ! slider Arrow
        var slideIndex = 1;

        showDivs(slideIndex);

        function plusDivs(n) {
            showDivs(slideIndex += n);
        }
        function showDivs(n) {
            // var x = item.childElementCount; subSubmenuOpen
            var ItemName
            if (!submenuOpen && subSubmenuOpen) {
                ItemName = $subSubMenu.find('li.active')[0].getAttribute('data-name')
            } else ItemName = $subMenu.find('li.active')[0].getAttribute('data-name')
            console.log('ItemNameeeee', ItemName)
            var elements = (`#${ItemName} .mySlides`)
            console.log('elements', elements)
            var x = document.querySelectorAll(elements);
            var i;

            if (n > x.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = x.length };
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            if (slideIndex - 1 >= 0 && slideIndex - 1 < x.length) {
                x[slideIndex - 1].style.display = "block";
            }
        }
    }).catch(error => console.error('error', error));
})
//* draggable
$(function () {
    $('.draggable-item').draggable({
        stop: function (event, ui) {
            var newPosition = ui.position;
            console.log('New position:', newPosition);
            //! Perform any further actions with the new position here
        },
        containment: "window",
        handle: ".adjustment-line"
    });

    $('.pcr-app').append('<div class="color-adjustment-line"></div>')
    $('.pcr-app').draggable({

        stop: function (event, ui) {
            var newPosition = ui.position;
            console.log('New position:', newPosition);
            //! Perform any further actions with the new position here
        },
        containment: "window",
        handle: ".color-adjustment-line"
    });
});

//*  pickr *** //
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
// * change the color of the main div when color changes
pickr.on("change", function (e) {
    document.documentElement.style.setProperty('--primary-hue', e.toRGBA()[0]);
    document.documentElement.style.setProperty('--secondary-hue', e.toRGBA()[1]);
    document.documentElement.style.setProperty('--accent-blue', e.toRGBA()[2]);
    document.documentElement.style.setProperty('--opacity', e.toRGBA()[3]);
}).on('save', (color, instance) => {
    console.log('Event: "save"', color, instance);
    pickr.hide()
})

//* Alert
$('.showALert').click(() => {
    $('.labelAlert').addClass('show')
    $('.labelAlert').removeClass('hide')
    setTimeout(() => {
        $('.labelAlert').addClass('hide')
    }, 3000)
})
// *text modal
$('.showModal').click(() => {
    $('.modal-window').addClass('show')
    $('.modal-window').removeClass('hide')
})
$('.normal-modal-close').click(() => {
    $('.modal-window').addClass('hide')
    $('.modal-window').removeClass('show')
})
// *save modal
$('.showSave').click(() => {
    $('.saveHideModal').addClass('show')
    $('.saveHideModal').removeClass('hide')
})
$('.showSave-modal-close').click(() => {
    $('.saveHideModal').addClass('hide')
    $('.saveHideModal').removeClass('show')
})

choseFont = () => {
    document.documentElement.style.setProperty('--font', 'Tajawal')
    //* Font available Rubik  / Inter
}
