var data = {
    menu: [{
        name: 'Women Cloth',
        link: '0',
        sub: null
    },
    {
        name: 'Men Cloth',
        link: '1',
        sub: [{
            name: 'sub',
            link: '0-0',
            sub: [{
                name: 'sub sub',
                link: '0-0',

            }, {
                name: 'Liverpool',
                link: '0-1',

            }, {
                name: 'Manchester United',
                link: '0-2',

            }]
        }, {
            name: 'Liverpool',
            link: '0-1',
            sub: null
        }, {
            name: 'Manchester United',
            link: '0-2',
            sub: null
        }]
    }, {
        name: 'Men Cloth',
        link: '1',
        sub: [{
            name: 'sub',
            link: '0-0',
            sub: [{
                name: 'subsub',
                link: '0-0',
            }, {
                name: 'Liverpool',
                link: '0-1',
            }, {
                name: 'Manchester United',
                link: '0-2',
            }]
        }, {
            name: 'Liverpool',
            link: '0-1',
            sub: null
        }, {
            name: 'Manchester United',
            link: '0-2',
            sub: null
        }]
    }]
};

var getMenuItem = function (itemData) {

    var item = $("<li>", {
        class: 'has-children',
        id: itemData.id
    }).append(
        $("<a>", {
            href: itemData.link,
            html: itemData.name,
            id: itemData.id + '-links',
        }));


    if (itemData.sub) {
        //Add UL once only
        var subList = $("<ul>", {
            class: 'secondary-dropdown',
        });
        //Append go back
        var goBack = $("<li>", {}).append(
            $("<a>", {
                href: '',
                html: 'Go back',
                class: 'go-back',
            }));
        //Append go back
        subList.append(goBack);
        $.each(itemData.sub, function (index, data) {
            //Sub menu
            var subMenuItem = $("<li>", {
                class: 'has-icon'
            }).append(
                $("<a>", {
                    href: data.link,
                    html: data.name,
                    class: 'submenu-title',
                }));
            subList.append(subMenuItem);
        });

        item.append(subList);
    }
    return item;
};

var $menu = $("#Menuu");
$.each(data.menu, function (index, data) {
    $menu.append(getMenuItem(data));
});