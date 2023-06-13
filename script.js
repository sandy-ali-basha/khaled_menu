var data = null;
const renderArrowList = (ArrowListItem) => {
    const innerMenu = ArrowListItem.map((item, index) => {
        return `
         <span class="mySlides" style="display: ${index < 1 ? 'block' : 'none'};" resend="${item.Resend}" id="${item.Id}">${item.Name}</span>
      `
    })
    return innerMenu
}

const renderArrowMix = (ArrowMix, ArrowMinimum, Name) => {
    const spans = [];
    for (let i = ArrowMinimum; i <= ArrowMix; i++) {
        spans.push(`<span class="mySlides" style="display: ${i <= 1 ? 'block' : 'none'};" id="${Name + i}">${i}</span>`);
    }
    return spans;
}

const renderSubMenu = (submenu) => {
    const innerMenu = submenu.map(item => {
        const Name = item.Name?.indexOf(' ') >= 0 ? item.Name.replace(/[\s\/]+/g, "") : item.Name;
        return `<li class="${item.Show ? '' : 'hide'}" data-description="${item.Description}"
        data-name=${Name} name="${item.Name}" >
        <a href="#">
        ${item.Checked === undefined ? item.Name : `<label for=${Name}>${item.Name}</label>`}
        </a>
    
        ${item.Checked === undefined ? ' ' : `<input id=${Name} type="checkbox" ${item.Checked ? 'Checked' : ' '}>`}
    
        ${item.SubMenu ? '<span>⇒</span>' : ' '}
        ${item.textBox ? `<span><input type="text" id="${Name}" ></input></span>` : ' '}
        
        ${item.ArrowList ? `<div class='leftRightItem' id='${Name}' >${renderArrowList(item.ArrowList)}</div>` : ' '}
        ${item.ArrowMix ? `<div class='leftRightItem' id="${Name}">${renderArrowMix(item.ArrowMix, item.ArrowMinimum, Name)}</div>` : ' '}
        ${item.BoxText ? `<i 
        BoxText="${item.BoxText.BoxText}"
       ${item.BoxText.BoxText2 ? `BoxText2="${item.BoxText.BoxText2}"` : ' '}
        Placeholder="${item.BoxText.Placeholder}"
        BoxText="${item.BoxText.BoxText}"
        Description="${item.BoxText.Description}"
        id="${item.BoxText.Name?.indexOf(' ') >= 0 ? item.BoxText.Name.replace(/[\s\/]+/g, "") : item.BoxText.Name}">${item.BoxText.Name}</i>` : ` `}
        </li> `
    })

    setTimeout(() => {
        const ulSubmenu = document.querySelectorAll("ul.submenu");
        ulSubmenu.forEach((ul) => {
            ul.innerHTML = ul.innerHTML.replace(/,/g, "");
        });
    }, 500)
    return innerMenu
}

async function fetchData() {
    try {
        const response = await fetch('./DataNewNew.json');
        data = await response.json();
        // * append Menu * //

        $('.menu-header').append(
            ` <img class="avatar" src = "${data.logo}" alt = "" /> <h2>${data.NamePlayer}</h2>`
        ) // * header
        $('.menu-title').append()//** render menu title 
        $('.menu-title').append(`<div class="menu-title">
        <p id="MenuName">Main Menu</p>
        <span class="menuTitle">${data.NameMenu}</span>
     </div>`)//** render menu title 
        $('.draggable-item').css('left', data.LocationsMenu.Menu.Left)
        $('.draggable-item').css('top', data.LocationsMenu.Menu.Top)

        $('.alertContainer').css('left', data.LocationsMenu.Notification.Left)
        $('.alertContainer').css('top', data.LocationsMenu.Notification.Top)

        $('.pcr-app').css('left', data.LocationsMenu.ColorPicker.Left)
        $('.pcr-app').css('top', data.LocationsMenu.ColorPicker.Top)

        $('.normalModal').css('left', data.LocationsMenu.NoClipText.Left)
        $('.normalModal').css('top', data.LocationsMenu.NoClipText.Top)

        $('#InputModal').css('left', data.LocationsMenu.BoxText.Left)
        $('#InputModal').css('top', data.LocationsMenu.BoxText.Top)

        // Menu Colors
        document.documentElement.style.setProperty('--primary-hue', data.ColorMenu.r);
        document.documentElement.style.setProperty('--secondary-hue', data.ColorMenu.g);
        document.documentElement.style.setProperty('--accent-blue', data.ColorMenu.b);
        document.documentElement.style.setProperty('--opacity', data.ColorMenu.a);

        //! append main menu items 
        $('.menu-body').append(`<ul data-MenuName="Main Menu" id="menu" class="show"></ul>`)
        data.Data.forEach((item, index) => {
            const ItemName = item.Name.replace(/[\s\/]+/g, "");

            $('#menu').append(`
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
        <ul data-MenuName="${item.Name}" class="submenu ${item.Name.replace(/[\s\/]+/g, "")}" >
            ${renderSubMenu(item.SubMenu)}
                    </ul>
        `)
            //* append sub sub menu if it there *//
            if (item.SubMenu) {
                item.SubMenu.map(subMenuItem => {
                    if (subMenuItem.SubMenu) {
                        const Name = subMenuItem.Name.replace(/[\s\/]+/g, "")
                        const ulContent = `<ul
                        data-MenuName="${subMenuItem.Name}"
                        class="submenu subSubMenu
                        ${subMenuItem.Name?.indexOf(' ') >= 0 ? Name : subMenuItem.Name}">
                        ${renderSubMenu(subMenuItem.SubMenu)}
                        </ul>`

                        $('.menu-body').append(ulContent)

                        subMenuItem.SubMenu.map(item => {
                            if (item.SubMenu) {
                                const Name = item.Name.replace(/[\s\/]+/g, "")
                                const ulContent = `<ul
                                data-MenuName="${item.Name}"
                                class="submenu subSubS ${item.Name?.indexOf(' ') >= 0 ? Name : item.Name}">
                                ${renderSubMenu(item.SubMenu)}
                                </ul>`
                                $('.menu-body').append(ulContent)
                            }
                        })
                    }
                })
            }
        })

        console.log('data: ', data)
        return data;
    } catch (error) {
        console.error(error);
    }
}
$(function () {
    fetchData().then(data => {
        //* change the theme 
        ChangeTheme(data.Theme)
        // * show Menu
        $('.menu').addClass('show')
        $('.menu').removeClass('hide')
        // * variables
        const $globalLinks = $('#menu').find('> li > a');
        let focusIndex = 0;
        let submenuOpen = false;
        let subSubmenuOpen = false;
        let subSubmenuOpened = false;
        let subSubSubmenuOpened = false;
        let $subMenu = null;
        let $subSubMenu = null;
        let $subSubSubMenu = null;
        let $subLinks = null;
        let $subSubLinks = null;
        let $subSubSubLinks = null;
        let focusIndexSubmenu = 0;
        let focusIndexSubSubmenu = 0;
        let focusIndexSubSubSubmenu = 0;
        let submenuOpened = false;
        let menuItems = null
        let firstItem = null
        let lastItem = null
        let activeItem = null

        $('#menu').find('li.active').focus();
        $(document).on('keydown', function (event) {
            switch (event.code) {
                case 'ArrowUp':
                    event.preventDefault();
                    if (!submenuOpen && !subSubmenuOpen && !subSubSubmenuOpened) {
                        // menu
                        focusIndex = Math.max(0, focusIndex - 1);
                    } else if (subSubmenuOpen && !submenuOpen && !subSubSubmenuOpened) {
                        // sub sub menu
                        focusIndexSubSubmenu = Math.max(0, focusIndexSubSubmenu - 1);
                    } else if (submenuOpen && !subSubmenuOpen && !subSubSubmenuOpened) {
                        // sub menu
                        focusIndexSubmenu = Math.max(0, focusIndexSubmenu - 1);
                    } else if (!submenuOpen && !subSubmenuOpen && subSubSubmenuOpened) {
                        focusIndexSubSubSubmenu = Math.max(0, focusIndexSubmenu - 1);
                    }
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (!submenuOpen && !subSubmenuOpen && !subSubSubmenuOpened) {
                        // menu
                        focusIndex = Math.min($globalLinks.length - 1, focusIndex + 1);
                    } else if (subSubmenuOpen && !submenuOpen && !subSubSubmenuOpened) {
                        // sub sub menu
                        focusIndexSubSubmenu = Math.min($subSubLinks.length - 1, focusIndexSubSubmenu + 1);
                    } else if (submenuOpen && !subSubmenuOpen && !subSubSubmenuOpened) {
                        // sub menu
                        focusIndexSubmenu = Math.min($subLinks.length - 1, focusIndexSubmenu + 1);
                    } else if (!submenuOpen && !subSubmenuOpen && subSubSubmenuOpened) {
                        // Sub sub sub menu
                        focusIndexSubSubSubmenu = Math.min($subSubSubLinks.length - 1, focusIndexSubSubSubmenu + 1);
                    }
                    break;
                case 'Enter':
                    event.preventDefault();
                    //*first menu
                    if (!submenuOpen && !subSubmenuOpen && !subSubSubmenuOpened) {
                        printItemData($('#menu'))
                        //! show sub menu when press enter in menu
                        if ($('#menu').find('li.active').length) {
                            //* sectionName / subMenu */

                            let sectionName = $('#menu').find('li.active').data('name');

                            $subMenu = $(`.submenu.${sectionName} `);
                            $subLinks = $subMenu.find('> li > a');
                            $globalLinks.eq(focusIndex).parent().removeClass('active');
                            $subLinks.parent().removeClass('active');
                            focusIndexSubmenu = 0;
                            submenuOpened = true;
                            submenuOpen = true;
                            $subMenu.addClass('show');
                            $('#menu').addClass('hide');
                            $('#menu').removeClass('show');
                            $subLinks.eq(focusIndexSubmenu).parent().addClass('active');
                        }
                    }// * second menu
                    else if (submenuOpen && !subSubmenuOpen && !subSubSubmenuOpened) {

                        printItemData($subMenu)
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
                            $subSubMenu.addClass('show');
                            $subSubMenu.removeClass('hide');
                            $subMenu.removeClass('show');
                            $subSubLinks.eq(focusIndexSubmenu).parent().addClass('active');
                        }
                        // * -------- actions on enter a sub menu item ------------
                        let subMenuItem = $subMenu.find('li.active')[0].getAttribute('data-name')

                        const Item = $subMenu.find('li.active')[0]
                        const hasCheckbox = Item.querySelector("input[type='checkbox']") !== null;

                        let divElement = Item.querySelector("i") !== null;
                        if (divElement) {
                            let id = Item.querySelector("i").id;
                            let BoxText = Item.querySelector("i").getAttribute('BoxText');
                            let Description = Item.querySelector("i").getAttribute('Description');
                            let Placeholder = Item.querySelector("i").getAttribute('Placeholder');
                            let BoxText2 = Item.querySelector("i").getAttribute('BoxText2') !== null;
                            let BoxText2Val
                            BoxText2 ? BoxText2Val = Item.querySelector("i").getAttribute('BoxText2') : BoxText2Val = null

                            const ModalData = `<h1>${id}</h1>
                            <div>${Description} <i>${Placeholder}</i></div>
                            <br /><div><small>${BoxText}</small></div>
                            <textarea rows="6" id="${BoxText}"></textarea>
                            ${BoxText2 ? ` <br /><div><small>${BoxText2Val}</small></div>
                            <textarea rows="6" id="${BoxText2Val}"></textarea>` : ' '}
                            <div class="btns">
                                <button class="Save SaveTextModal">Save</button>
                                <button class="Cancel closeTextModal" >cancel</button>
                            </div>`
                            $('#InputModal').empty()
                            $('#InputModal').append(ModalData)
                            $('.saveHideModal').addClass('show')
                            $('.saveHideModal').removeClass('hide')
                        }

                        if (hasCheckbox) checkbox(subMenuItem)

                        let activeSearch = false
                        console.log('let activeSearch', activeSearch)
                        switch (subMenuItem) {
                            case "ChangeMenuColor":
                                pickr.show()
                                //! add your mouse enable function here 
                                break;
                            case 'ChangeLocation':
                                $('.adjustment-line').addClass('show')
                                $('.adjustment-line').removeClass('hide')
                                break;
                            case 'Search':
                                console.log('activeSearch', activeSearch)
                                if (activeSearch) {
                                    activeSearch = false
                                    Item.querySelector("input").blur();
                                }
                                else {
                                    activeSearch = true
                                    Item.querySelector("input").focus()
                                }
                                const inputValue = Item.querySelector("input").value;
                                console.log('inputValue', inputValue)

                                break;
                            case 'BannedSearch':
                                console.log('activeSearch', activeSearch)
                                if (activeSearch) {
                                    activeSearch = false
                                    Item.querySelector("input").blur();
                                }
                                else {
                                    activeSearch = true
                                    Item.querySelector("input").focus()
                                }
                                const BannedSearch = Item.querySelector("input").value;
                                console.log('Banned Search Value', BannedSearch)

                                break;
                        }
                    } //* third menu
                    else if (!submenuOpen && subSubmenuOpen && !subSubSubmenuOpened) {
                        printItemData($subSubMenu)
                        // ! -------- actions on enter a sub sub menu item ------------
                        //  item Name 
                        const subSubMenuItem = $subSubMenu.find('li.active')[0].getAttribute('data-name');
                        const SubItem = $subSubMenu.find('li.active')[0]
                        // * SubHasCheckbox
                        const SubHasCheckbox = SubItem.querySelector("input[type='checkbox']") !== null;
                        if (SubHasCheckbox) checkbox(subSubMenuItem)
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
                        // ! open sub sub sub menu
                        let SubDataName = $subSubMenu.find('li.active')[0].getAttribute('data-name')
                        $subSubSubMenu = $(`.subSubS.${SubDataName} `);
                        if ($subSubSubMenu.length > 0) {
                            $subSubSubLinks = $subSubSubMenu.find('> li > a');
                            $globalLinks.eq(focusIndex).parent().removeClass('active');
                            $subSubSubLinks.parent().removeClass('active');
                            focusIndexSubSubSubmenu = 0;
                            submenuOpened = false;
                            submenuOpen = false;
                            subSubmenuOpen = false;
                            subSubmenuOpened = false;
                            subSubSubmenuOpened = true;
                            $subSubSubMenu.addClass('show');
                            $subSubSubMenu.removeClass('hide');
                            $subSubMenu.removeClass('show');
                            $subSubSubLinks.eq(focusIndexSubSubSubmenu).parent().addClass('active');
                        }
                    } //* menu four
                    else if (!submenuOpen && !subSubmenuOpen && subSubSubmenuOpened) {
                        printItemData($subSubSubMenu)
                        // ! click Enter on Sub sub sub menu item
                        let ItemName = $subSubSubMenu.find('li.active')[0].getAttribute('name')
                        // * checkbox
                        const Item = $subSubSubMenu.find('li.active')[0]
                        const hasCheckbox = Item.querySelector("input[type='checkbox']") !== null;
                        if (hasCheckbox) checkbox(ItemName)

                        if (ItemName === 'Primary Color' || ItemName === 'Secondary Color') {
                            pickr.show()
                        }
                    }
                    break;
                case 'Backspace':
                    event.preventDefault();
                    if (submenuOpened && !subSubmenuOpen && !subSubSubmenuOpened) {
                        // back from sub menu
                        $subMenu.removeClass('show');
                        $('#menu').removeClass('hide');
                        $('#menu').addClass('show');
                        $subLinks.parent().removeClass('active');
                        focusIndexSubmenu = 0;
                        submenuOpened = false;
                        submenuOpen = false;
                        $('#menu').find('li.active').removeClass('active');
                        $globalLinks.eq(focusIndex).parent().addClass('active');
                    } else if (!submenuOpened && subSubmenuOpen && !subSubSubmenuOpened) {
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
                        $('#menu').find('li.active').removeClass('active');
                        $globalLinks.eq(focusIndex).parent().addClass('active');
                    } else if (!submenuOpened && !subSubmenuOpen && subSubSubmenuOpened) {
                        // ! Back From Sub sub sub Menu 😃
                        console.log('back in sub sub sub menu')
                        $globalLinks.parent().removeClass('active');
                        focusIndex = 0;
                        $subSubSubMenu.removeClass('show');
                        $subSubMenu.addClass('show');
                        $subSubMenu.removeClass('hide');
                        focusIndexSubSubmenu = 0;
                        subSubmenuOpen = true;
                        subSubmenuOpened = true;
                        subSubSubmenuOpened = false;
                        $('#menu').find('li.active').removeClass('active');
                        $globalLinks.eq(focusIndex).parent().addClass('active');
                    }
                    break;
                case 'KeyH':
                    $('.menu').removeClass('show')
                    $('.menu').addClass('hide')

                    $('.menu-title').empty();
                    $('.menu-header').empty();
                    $('.menu-body').empty();

                    break;
                case 'KeyM':
                    fetchData()
                    $('.menu').removeClass('hide')
                    $('.menu').addClass('show')
                    break;
                case 'ArrowRight':
                    plusDivs(1)
                    break;
                case 'ArrowLeft':
                    plusDivs(-1)
                    break;
            }

            const menuList = document.querySelector(".menu-body ul.show");
            // var MenuName = menuList.getAttribute('data-MenuName');
            // $('#MenuName').text(MenuName)
            //* moving
            if (menuList) {
                menuItems = menuList.getElementsByTagName("li");
                firstItem = menuItems[0];
                lastItem = menuItems[menuItems.length - 1];
                for (index in menuItems) {
                    if (menuItems[index]?.classList?.contains('active')) {
                        activeItem = menuItems[index]
                    }
                }
                if (event.key === "ArrowDown" && activeItem !== lastItem) {
                    event.preventDefault();
                    if (activeItem.nextElementSibling.offsetTop >= menuList.clientHeight - 10) {
                        menuList.scrollTop = activeItem.nextElementSibling.offsetTop - menuList.clientHeight + activeItem.previousElementSibling.clientHeight;
                        activeItem.nextElementSibling.focus()
                    }
                    activeItem.nextElementSibling.focus();
                } else if (event.key === "ArrowUp" && activeItem !== firstItem) {
                    event.preventDefault();
                    if (activeItem.previousElementSibling.offsetTop < menuList.scrollTop) {
                        menuList.scrollTop = menuList.scrollTop - activeItem.previousElementSibling.clientHeight;
                        activeItem.previousElementSibling.focus();
                    }
                    activeItem.previousElementSibling.focus();
                }
            }

            //! change focus 
            // menu
            if (!submenuOpen && !subSubmenuOpened && !subSubSubmenuOpened) {
                const MenuName = $('#menu')
                Focus($globalLinks, focusIndex, MenuName)
            }
            // sub menu
            if (submenuOpened && !subSubmenuOpened && !subSubSubmenuOpened) {
                Focus($subLinks, focusIndexSubmenu, $subMenu)
            }
            // sub sub menu
            if (subSubmenuOpened && !submenuOpened && !subSubSubmenuOpened) {
                Focus($subSubLinks, focusIndexSubSubmenu, $subSubMenu)
            }
            // sub sub sub menu
            if (!subSubmenuOpened && !submenuOpened && subSubSubmenuOpened) {
                Focus($subSubSubLinks, focusIndexSubSubSubmenu, $subSubSubMenu)
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
            if (!submenuOpen && subSubmenuOpen && !subSubSubmenuOpened) {
                ItemName = $subSubMenu.find('li.active')[0].getAttribute('data-name')
                setTimeout(() => {
                    const li = $subSubMenu.find('li.active')[0];
                    const span = li.querySelector('span.mySlides[style="display: block;"]');
                    let Id = span.getAttribute('id')
                    let resendData = span.getAttribute('resend')
                    const content = span.textContent;
                    console.log('Id:', Id)
                    console.log('resendData:', resendData)
                    ChangeTheme(content)
                }, 400)
            }
            else if (submenuOpen && !subSubmenuOpen && !subSubSubmenuOpened) {
                ItemName = $subMenu.find('li.active')[0].getAttribute('data-name')
                setTimeout(() => {
                    const li = $subMenu.find('li.active')[0];
                    const span = li.querySelector('span.mySlides[style="display: block;"]');
                    let Id = span.getAttribute('id')
                    const content = span.textContent;
                    console.log('Id:', Id)
                    let resendData = span.getAttribute('resend')
                    console.log('resendData:', resendData)
                    ChangeTheme(content)
                }, 400)
            }
            else if (!submenuOpen && !subSubmenuOpen && subSubSubmenuOpened) {
                ItemName = $subSubSubMenu.find('li.active')[0].getAttribute('data-name')
                setTimeout(() => {
                    const li = $subSubSubMenu.find('li.active')[0];
                    const span = li.querySelector('span.mySlides[style="display: block;"]');
                    let Id = span.getAttribute('id')
                    const content = span.textContent;
                    console.log('Id:', Id)
                    let resendData = span.getAttribute('resend')
                    console.log('resendData:', resendData)
                    ChangeTheme(content)
                }, 400)
            }

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

// !
function Focus(Link, focusIndex, MenuName) {
    Link.parent().removeClass('active');
    Link.eq(focusIndex).parent().addClass('active');
    activeDescription = MenuName.find('li.active')[0].getAttribute('data-description')
    $('.menu-footer p').text(activeDescription);
}
//! set Theme
function ChangeTheme(Theme) {
    console.log('ChangeTheme', Theme)
    if (Theme === 'Basic') {
        $('.menu').addClass('redMenu')
        $('.menu').removeClass('Green')
    } else if (Theme === 'Default') {
        $('.menu').removeClass('Green')
        $('.menu').removeClass('redMenu')
    } else if (Theme === 'Modern') {
        $('.menu').addClass('Green')
        $('.menu').removeClass('redMenu')
    }
}
// -- -- --
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
}).on('clear', instance => {
    console.log('Event: "clear"', instance);
}).on('hide', instance => {
    console.log('Event: "hide"', instance);
})

//* Alert
$(document).ready(() => {
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
})
$(document).on('click', '.closeTextModal', () => {
    console.log("Button clicked closeTextModal");
    $('.saveHideModal').addClass('hide')
    $('.saveHideModal').removeClass('show')
})
$(document).on('click', '.SaveTextModal', () => {
    console.log("Button clicked SaveTextModal");
    $('.saveHideModal').addClass('hide')
    $('.saveHideModal').removeClass('show')
})
$(document).on('click', '.TechBtn', () => {
    console.log("Button clicked SaveTextModal");
    $('.adjustment-line').addClass('hide')
    $('.adjustment-line').removeClass('show')
})
choseFont = () => {
    document.documentElement.style.setProperty('--font', 'Tajawal')
    //* Font available Rubik  / Inter
}

function checkbox(subMenuItem) {
    const checkedItem = document.getElementById(subMenuItem).checked;
    checkedItem ? document.getElementById(subMenuItem).checked = false : document.getElementById(subMenuItem).checked = true
}

function printItemData(itemName) {
    console.log(' ')
    console.log('sectionName: ', itemName.find('li.active').data('name'))
    console.log('description: ', itemName.find('li.active').data('description'))
    console.log('Name: ', itemName.find('li.active')[0].getAttribute('name'))
    console.log(' ')
}
