$(() => {
    const $menu = $('body #menu');
    const data = [
        {
            "Id": 1,
            "Show": true,
            "NeedApi": true,
            "SubMenu": [],
            "Name": "Online Players",
            "Description": "All currently connected players."
        },
        {
            "Id": 2,
            "Show": true,
            "NeedApi": false,
            "SubMenu": [{
                "Show": true,
                "Name": "Toggle NoClip",
                "Id": 4,
                "Description": "Toggle NoClip on or off."
            }, {
                "Show": true,
                "Name": "Toggle NoClip Type",
                "Id": 5,
                "Description": "Toggle the type of NoClip, there is more than type of NoClip."
            }, {
                "Show": true,
                "Name": "Last Teleport Back",
                "Id": 6,
                "Description": "Go back to the last location you were at 15 seconds ago."
            }, {
                "Id": 1,
                "Show": true,
                "SubMenu": [{
                    "Id": 1,
                    "Show": true,
                    "Checked": false,
                    "Name": "Godmode",
                    "Description": "Makes you invincible."
                }, {
                    "Id": 2,
                    "Show": true,
                    "Checked": false,
                    "Name": "Invisible",
                    "Description": "Makes you invisible to yourself and others."
                }, {
                    "Id": 3,
                    "Show": true,
                    "Checked": false,
                    "Name": "Unlimited Stamina",
                    "Description": "Allows you to run forever without slowing down or taking damage."
                }, {
                    "Id": 4,
                    "Show": true,
                    "Checked": false,
                    "Name": "Fast Run",
                    "Description": "Get Snail powers and run very fast!"
                }, {
                    "Id": 5,
                    "Show": true,
                    "Checked": false,
                    "Name": "Fast Swim",
                    "Description": "Get Snail powers and Swim very fast!"
                }, {
                    "Id": 6,
                    "Show": true,
                    "Checked": false,
                    "Name": "Super Jump",
                    "Description": "Get powers and do super jump."
                }, {
                    "Id": 7,
                    "Show": true,
                    "Checked": false,
                    "Name": "No Ragdoll",
                    "Description": "Disables player ragdoll, makes you not fall off your bike anymore."
                }, {
                    "Id": 8,
                    "Show": true,
                    "Checked": false,
                    "Name": "Everyone Ignore Player",
                    "Description": "Everyone will leave you alone."
                }, {
                    "Id": 9,
                    "Show": true,
                    "Checked": false,
                    "Name": "Stay In Vehicle",
                    "Description": "When this is enabled, NPCs will not be able to drag you out of your vehicle if they get angry at you."
                }, {
                    "Id": 10,
                    "Show": true,
                    "Checked": false,
                    "Name": "Freeze Player",
                    "Description": "Freezes your current location."
                }, {
                    "Show": true,
                    "Name": "Set Armor",
                    "Id": 11,
                    "Description": "Set the armor for your player."
                }, {
                    "Show": true,
                    "Name": "Heal Player",
                    "Id": 12,
                    "Description": "Give the player max health."
                }, {
                    "Show": true,
                    "Name": "Heal All Player",
                    "Id": 13,
                    "Description": "Give the All player max health."
                }, {
                    "Id": 14,
                    "Show": true,
                    "Checked": false,
                    "Name": "Toggle Night Vision",
                    "Description": "Enable or disable night vision."
                }, {
                    "Id": 15,
                    "Show": true,
                    "Checked": false,
                    "Name": "Toggle Thermal Vision",
                    "Description": "Enable or disable Thermal vision."
                }, {
                    "Show": true,
                    "Name": "Clean Player Clothes",
                    "Id": 16,
                    "Description": "Clean your player clothes."
                }, {
                    "Show": true,
                    "Name": "Dry Player Clothes",
                    "Id": 17,
                    "Description": "Make your player clothes dry."
                }, {
                    "Show": true,
                    "Name": "Wet Player Clothes",
                    "Id": 18,
                    "Description": "Make your player clothes Wet."
                }, {
                    "Show": true,
                    "Name": "Commit Suicide",
                    "Id": 19,
                    "Description": "Kill yourself by taking the pill. Or by using a pistol if you have one."
                }, {
                    "Show": true,
                    "Name": "Player Scenarios",
                    "Id": 20,
                    "Description": "Select a scenario and hit enter to start it. Selecting another scenario will override the current scenario. If you're already playing the selected scenario, selecting it again will stop the scenario."
                }, {
                    "Id": 21,
                    "Show": true
                }],
                "Name": "Player Options",
                "Description": "Common player options can be accessed here."
            }, {
                "Id": 3,
                "Show": true,
                "SubMenu": [{
                    "Show": true,
                    "Name": "Get All Weapons",
                    "Id": 1,
                    "Description": "Get all weapons."
                }, {
                    "Show": true,
                    "Name": "Remove All Weapons",
                    "Id": 2,
                    "Description": "Removes all weapons in your inventory."
                }, {
                    "Id": 3,
                    "Show": true,
                    "Checked": false,
                    "Name": "Unlimited Ammo",
                    "Description": "Unlimited ammonition supply."
                }, {
                    "Id": 4,
                    "Show": true,
                    "Checked": false,
                    "Name": "No Reload",
                    "Description": "Never reload."
                }, {
                    "Show": true,
                    "Name": "Set All Ammo Count",
                    "Id": 5,
                    "Description": "Set the amount of ammo in all your weapons."
                }, {
                    "Show": true,
                    "Name": "Refill All Ammo",
                    "Id": 6,
                    "Description": "Give all your weapons max ammo."
                }, {
                    "Id": 7,
                    "Show": true,
                    "BoxText": true,
                    "Name": "Spawn Weapon By Name",
                    "Description": "Enter a weapon mode name to spawn."
                }, {
                    "Id": 8,
                    "Show": true,
                    "SubMenu": [{
                        "Show": true,
                        "Name": "Toggle Primary Parachute",
                        "Id": 1,
                        "Description": "Equip or remove the primary parachute"
                    }, {
                        "Show": true,
                        "Name": "Enable Reserve Parachute",
                        "Id": 2,
                        "Description": "Enables the reserve parachute. Only works if you enabled the primary parachute first. Reserve parachute can not be removed from the player once it's activated."
                    }, {
                        "Id": 3,
                        "Show": true,
                        "Checked": false,
                        "Name": "Unlimited Parachutes",
                        "Description": "Enable unlimited parachutes and reserve parachutes."
                    }, {
                        "Id": 4,
                        "Show": true,
                        "Checked": false,
                        "Name": "Auto Equip Parachutes",
                        "Description": "Automatically equip a parachute and reserve parachute when entering planes/helicopters."
                    }],
                    "Name": "Parachute Options",
                    "Description": "Parachute Options."
                }],
                "Name": "Weapon Options",
                "Description": "Add/remove weapons, modify weapons and set ammo options."
            }, {
                "Id": 2,
                "Show": true,
                "SubMenu": [],
                "Name": "Player Appearance",
                "Description": "Choose a ped model, customize it and save & load your customized characters."
            }],
            "Name": "Player Related Options",
            "Description": "Open this submenu for player related subcategories."
        },
        {
            "Id": 3,
            "Show": true,
            "NeedApi": false,
            "SubMenu": [{
                "Id": 1,
                "Show": true,
                "SubMenu": [{
                    "Id": 1,
                    "Show": true,
                    "Checked": false,
                    "Name": "Vehicle Godmode",
                    "Description": "Enable or disable specific damage types."
                }, {
                    "Id": 2,
                    "Show": true,
                    "Checked": false,
                    "Name": "Keep Vehicle Clean",
                    "Description": "This will constantly clean your car if the vehicle dirt level goes above 0. Note that this only cleans dust or dirt. This does not clean mud, snow or other damage decals. Repair your vehicle to remove them."
                }, {
                    "Id": 3,
                    "Show": true,
                    "Checked": false,
                    "Name": "Bike Seatbelt",
                    "Description": "Prevents you from being knocked off your bike, bicyle, ATV or similar."
                }, {
                    "Id": 4,
                    "Show": true,
                    "Checked": false,
                    "Name": "Engine Always On",
                    "Description": "Keeps your vehicle engine on when you exit your vehicle."
                }, {
                    "Id": 5,
                    "Show": true,
                    "Checked": false,
                    "Name": "Disable Plane Turbulence",
                    "Description": "Disables the turbulence for all planes. Note only works for planes. Helicopters and other flying vehicles are not supported."
                }, {
                    "Id": 6,
                    "Show": true,
                    "Checked": false,
                    "Name": "Disable Siren",
                    "Description": "Disables your vehicle's siren. Only works if your vehicle actually has a siren."
                }, {
                    "Id": 7,
                    "Show": true,
                    "Checked": false,
                    "Name": "No Bike Helmet",
                    "Description": "No longer auto-equip a helmet when getting on a bike or quad."
                }, {
                    "Id": 8,
                    "Show": true,
                    "Checked": false,
                    "Name": "Freeze Vehicle",
                    "Description": "Freeze your vehicle's position."
                }, {
                    "Id": 9,
                    "Show": true,
                    "Checked": false,
                    "Name": "Flash Highbeams On Honk",
                    "Description": "Turn on your highbeams on your vehicle when honking your horn. Does not work during the day when you have your lights turned off."
                }, {
                    "Id": 10,
                    "Show": true,
                    "Checked": false,
                    "Name": "Show Vehicle Health",
                    "Description": "Shows the vehicle health on the screen."
                }, {
                    "Id": 11,
                    "Show": true,
                    "Checked": false,
                    "Name": "Infinite Fuel",
                    "Description": "Enables or disables infinite fuel for this vehicle, only works if FRFuel is installed."
                }, {
                    "Show": true,
                    "Name": "Repair Vehicle",
                    "Id": 12,
                    "Description": "Repair any visual and physical damage present on your vehicle."
                }, {
                    "Id": 13,
                    "Show": true,
                    "Checked": false,
                    "Name": "Auto Repair",
                    "Description": "Automatically repairs your vehicle when it has ANY type of damage. It's recommended to keep this turned off to prevent glitchyness."
                }, {
                    "Name": "Wash Vehicle",
                    "Id": 14,
                    "Description": "Clean your vehicle."
                }, {
                    "Show": true,
                    "Name": "Toggle Engine On/Off",
                    "Id": 15,
                    "Description": "Turn your engine on/off."
                }, {
                    "Id": 16,
                    "Show": true,
                    "BoxText": true,
                    "Name": "Set License Plate Text",
                    "Description": "Enter a custom license plate for your vehicle."
                }, {
                    "Show": true,
                    "Name": "Toggle Vehicle Visibility",
                    "Id": 17,
                    "Description": "Makes your vehicle visible/invisible. Your vehicle will be made visible again as soon as you leave the vehicle. Otherwise you would not be able to get back in."
                }, {
                    "Show": true,
                    "Name": "Flip Vehicle",
                    "Id": 18,
                    "Description": "Sets your current vehicle on all 4 wheels."
                }, {
                    "Show": true,
                    "Name": "Toggle Vehicle Alarm",
                    "Id": 19,
                    "Description": "Starts/stops your vehicle's alarm."
                }, {
                    "Show": true,
                    "Name": "Cycle Through Vehicle Seats",
                    "Id": 20,
                    "Description": "Cycle through the available vehicle seats."
                }, {
                    "Show": true,
                    "Name": "Delete Vehicle",
                    "Id": 21,
                    "Description": "Delete your vehicle."
                }],
                "Name": "Vehicle Options",
                "Description": "Here you can change common vehicle options, as well as tune & style your vehicle."
            }, {
                "Id": 2,
                "Show": true,
                "SubMenu": [{
                    "Show": true,
                    "Name": "Spawn Vehicle By Model Name",
                    "Id": 1,
                    "Description": "Enter the name of a vehicle to spawn."
                }, {
                    "Id": 2,
                    "Show": true,
                    "Checked": false,
                    "Name": "Spawn Inside Vehicle",
                    "Description": "This will teleport you into the vehicle when you spawn it."
                }, {
                    "Id": 3,
                    "Show": true,
                    "Checked": false,
                    "Name": "Replace Previous Vehicle",
                    "Description": "This will automatically delete your previously spawned vehicle when you spawn a new vehicle."
                }],
                "Name": "Vehicle Spawner",
                "Description": "Spawn a vehicle by name or choose one from a specific category."
            }],
            "Name": "Vehicle Related Options",
            "Description": "Open this submenu for vehicle related subcategories."
        },
        {
            "Id": 4,
            "Show": true,
            "NeedApi": false,
            "SubMenu": [{
                "Id": 1,
                "Show": true,
                "SubMenu": [{
                    "Id": 1,
                    "Show": true,
                    "Checked": false,
                    "Name": "Freeze/Unfreeze Time",
                    "Description": "Enable or disable time freezing."
                }, {
                    "Id": 2,
                    "Show": true,
                    "Label": "06:00",
                    "Name": "Early Morning",
                    "Description": "Set the time to 06:00."
                }, {
                    "Id": 3,
                    "Show": true,
                    "Label": "09:00",
                    "Name": "Morning",
                    "Description": "Set the time to 09:00."
                }, {
                    "Id": 4,
                    "Show": true,
                    "Label": "12:00",
                    "Name": "Noon",
                    "Description": "Set the time to 12:00."
                }, {
                    "Id": 5,
                    "Show": true,
                    "Label": "15:00",
                    "Name": "Early Afternoon",
                    "Description": "Set the time to 15:00."
                }, {
                    "Id": 6,
                    "Show": true,
                    "Label": "18:00",
                    "Name": "Afternoon",
                    "Description": "Set the time to 18:00."
                }, {
                    "Id": 7,
                    "Show": true,
                    "Label": "21:00",
                    "Name": "Evening",
                    "Description": "Set the time to 21:00."
                }, {
                    "Id": 8,
                    "Show": true,
                    "Label": "00:00",
                    "Name": "Midnight",
                    "Description": "Set the time to 00:00."
                }, {
                    "Id": 9,
                    "Show": true,
                    "Label": "03:00",
                    "Name": "Night",
                    "Description": "Set the time to 03:00."
                }, {
                    "Show": true,
                    "Name": "Set Custom Hour",
                    "Id": 10,
                    "Description": "Choose a custom Hour."
                }, {
                    "Show": true,
                    "Name": "Set Custom Minute",
                    "Id": 11,
                    "Description": "Choose a custom Minute."
                }],
                "Name": "Time Options",
                "Description": "Change the time, and edit other time related options."
            }, {
                "Id": 2,
                "Show": true,
                "SubMenu": [{
                    "Id": 1,
                    "Show": true,
                    "Checked": false,
                    "Name": "Special Weather Time",
                    "Description": "You can set a special weather and time in your world that is not visible to all players, only you."
                }, {
                    "Id": 2,
                    "Show": true,
                    "Checked": false,
                    "Name": "Toggle Dynamic Weather",
                    "Description": "Enable or disable dynamic weather changes."
                }, {
                    "Id": 3,
                    "Show": true,
                    "Checked": false,
                    "Name": "Toggle Blackout",
                    "Description": "This disables or enables all lights across the map."
                }, {
                    "Id": 4,
                    "Show": true,
                    "Checked": true,
                    "Name": "Enable Snow Effects",
                    "Description": "This will enable snow particle effects for peds and vehicles. Combine with X-MAS Blizzard weather for best results."
                }, {
                    "Show": true,
                    "Name": "Extra Sunny",
                    "Id": 5,
                    "Description": "Set the weather to extra sunny!"
                }, {
                    "Show": true,
                    "Name": "Clear",
                    "Id": 6,
                    "Description": "Set the weather to clear!"
                }, {
                    "Show": true,
                    "Name": "Neutral",
                    "Id": 7,
                    "Description": "Set the weather to Neutral!"
                }, {
                    "Show": true,
                    "Name": "Smog",
                    "Id": 8,
                    "Description": "Set the weather to Smog!"
                }, {
                    "Show": true,
                    "Name": "Foggy",
                    "Id": 9,
                    "Description": "Set the weather to Foggy!"
                }, {
                    "Show": true,
                    "Name": "Cloudy",
                    "Id": 10,
                    "Description": "Set the weather to Cloudy!"
                }, {
                    "Show": true,
                    "Name": "Overcast",
                    "Id": 11,
                    "Description": "Set the weather to Overcast!"
                }, {
                    "Show": true,
                    "Name": "Clearing",
                    "Id": 12,
                    "Description": "Set the weather to Clearing!"
                }, {
                    "Show": true,
                    "Name": "Rainy",
                    "Id": 13,
                    "Description": "Set the weather to Rainy!"
                }, {
                    "Show": true,
                    "Name": "Thunder",
                    "Id": 14,
                    "Description": "Set the weather to Thunder!"
                }, {
                    "Show": true,
                    "Name": "Blizzard",
                    "Id": 15,
                    "Description": "Set the weather to Blizzard!"
                }, {
                    "Show": true,
                    "Name": "Snow",
                    "Id": 16,
                    "Description": "Set the weather to Snow!"
                }, {
                    "Show": true,
                    "Name": "Light Snow",
                    "Id": 17,
                    "Description": "Set the weather to Light Snow!"
                }, {
                    "Show": true,
                    "Name": "XMAS Snow",
                    "Id": 18,
                    "Description": "Set the weather to XMAS Snow!"
                }, {
                    "Show": true,
                    "Name": "Halloween",
                    "Id": 19,
                    "Description": "Set the weather to Halloween!"
                }],
                "Name": "Weather Options",
                "Description": "Change all weather related options here."
            }],
            "Name": "World Related Options",
            "Description": "Open this submenu for world related subcategories."
        },
        {
            "Id": 5,
            "Show": true,
            "NeedApi": false,
            "SubMenu": [{
                "Show": true,
                "Name": "Rockstar Editor",
                "Id": 1,
                "Description": "Open the rockstar editor, note you might want to quit the session first before doing this to prevent some issues."
            }, {
                "Show": true,
                "Name": "Start Recording",
                "Id": 2,
                "Description": "Start a new game recording using GTA V's built in recording."
            }, {
                "Show": true,
                "Name": "Stop Recording",
                "Id": 3,
                "Description": "Stop and save your current recording."
            }],
            "Name": "Recording Options",
            "Description": "In-game recording options."
        },
        {
            "Id": 6,
            "Show": true,
            "NeedApi": false,
            "SubMenu": [{
                "Id": 1,
                "Show": true,
                "SubMenu": [{
                    "Id": 1,
                    "Show": true,
                    "BoxText": true,
                    "Name": "Teleport To Coords",
                    "Description": "Enter x, y, z coordinates and you will be teleported to that location."
                }, {
                    "Show": true,
                    "Name": "Teleport To Waypoint",
                    "Id": 2,
                    "Description": "Teleport to the waypoint on your map."
                }, {
                    "Show": true,
                    "Name": "Copy Current Coords",
                    "Id": 3,
                    "Description": "Copy the current coordinates."
                }],
                "Name": "Teleport Options",
                "Description": "Various teleport options."
            }, {
                "Id": 2,
                "Show": true,
                "SubMenu": [{
                    "Show": true,
                    "Name": "Clear Area",
                    "Id": 1,
                    "Description": "Clears the area around your player (100 meters). Damage, dirt, peds, props, vehicles, etc. Everything gets cleaned up, fixed and reset to the default world state."
                }, {
                    "Id": 2,
                    "Show": true,
                    "Checked": false,
                    "Name": "Show Coordinates",
                    "Description": "Show your current coordinates at the top of your screen."
                }],
                "Name": "Development Tools",
                "Description": "Various development/debug tools."
            }, {
                "Id": 3,
                "Show": true,
                "Checked": false,
                "Name": "Show Speed KM/H",
                "Description": "Show a speedometer on your screen indicating your speed in KM/h."
            }, {
                "Id": 4,
                "Show": true,
                "Checked": false,
                "Name": "Show Speed MP/H",
                "Description": "Show a speedometer on your screen indicating your speed in MP/h."
            }, {
                "Id": 5,
                "Show": true,
                "SubMenu": [{
                    "Show": true,
                    "Name": "Quit Server",
                    "Id": 1,
                    "Description": "Exits the game."
                }, {
                    "Show": true,
                    "Name": "Disconnect Server",
                    "Id": 2,
                    "Description": "Disconnect from the server."
                }],
                "Name": "Connection Options",
                "Description": "Server game quit options."
            }, {
                "Id": 6,
                "Show": true,
                "Checked": false,
                "Name": "Location Display",
                "Description": "Shows your current location and heading."
            }, {
                "Id": 7,
                "Show": true,
                "Checked": false,
                "Name": "Show Time On Screen",
                "Description": "Shows you the current time on screen."
            }, {
                "Id": 8,
                "Show": true,
                "Checked": false,
                "Name": "Join / Quit Notifications",
                "Description": "Receive notifications when someone joins or leaves the server."
            }, {
                "Id": 9,
                "Show": true,
                "Checked": false,
                "Name": "Show Player Blips",
                "Description": "Shows blips on the map for all players."
            }, {
                "Id": 10,
                "Show": true,
                "Checked": false,
                "Name": "Show Player Names",
                "Description": "Shows Names on overhead player."
            }, {
                "Id": 11,
                "Show": true,
                "Checked": false,
                "Name": "Hide Radar",
                "Description": "Hide the minimap."
            }, {
                "Id": 12,
                "Show": true,
                "Checked": false,
                "Name": "Hide Hud",
                "Description": "Hide all hud elements."
            }, {
                "Id": 13,
                "Show": true,
                "Checked": false,
                "Name": "Lock Camera Horizontal Rotation",
                "Description": "Locks your camera horizontal rotation. Could be useful in helicopters I guess."
            }, {
                "Id": 14,
                "Show": true,
                "Checked": false,
                "Name": "Lock Camera Vertical Rotation",
                "Description": "Locks your camera Vertical rotation. Could be useful in helicopters I guess."
            }, {
                "Show": true,
                "Name": "Change Language",
                "Id": 15,
                "Description": "You can now change the language to Arabic or English using this option."
            }, {
                "Show": true,
                "Name": "Save Settings",
                "Id": 16,
                "Description": "Save your current settings. All saving is done on the client side, if you re-install windows you will lose your settings. Settings are shared across all servers using RAM_vMenu."
            }, {
                "Show": true,
                "Name": "Reset Settings",
                "Id": 17,
                "Description": "The settings are Reset to their original and then saved."
            }],
            "Name": "Misc Settings",
            "Description": "Miscellaneous RAM_vMenu options/settings can be configured here. You can also save your settings in this menu and change the language and theme."
        },
        {
            "Id": 7,
            "Show": true,
            "NeedApi": false,
            "SubMenu": [{
                "Show": true,
                "Name": "Server Info",
                "Id": 1,
                "Description": "Description Server Info"
            }, {
                "Show": true,
                "Name": "RAM_vMenu Version | v1",
                "Id": 2,
                "Description": "Description RAM_vMenu Version"
            }, {
                "Show": true,
                "Name": "About RAM_vMenu / Credits",
                "Id": 3,
                "Description": "Description About RAM_vMenu / Credits"
            }],
            "Name": "About RAM_vMenu",
            "Description": "Information about RAM_vMenu."
        },
        {
            "Name": "Colors",
            "Id": 8,
            "Description": "Change menu theme",
            "Show": true,
            "NeedApi": true,
            "SubMenu": [
                {
                    "Id": 1,
                    "Show": true,
                    "Name": "Default",
                    "Description": "Default"
                },
                {
                    "Id": 2,
                    "Show": true,
                    "Name": "Red",
                    "Description": "Red"
                },
                {
                    "Id": 3,
                    "Show": true,
                    "Name": "Dark Blue",
                    "Description": "Green"
                }
            ]
        }]

    const renderSubMenu = (submenu) => {
        const innermenu = submenu.map(item => {
            return `<li data-description="${item.Description}"><a href="#">${item.Name}</a></li>`
        })
        setTimeout(() => {
            const ulSubmenu = document.querySelectorAll("ul.submenu");
            ulSubmenu.forEach((ul) => {
                ul.innerHTML = ul.innerHTML.replace(/,/g, "");
            });
        }, 500)
        return innermenu
    }

    data.forEach((item, index) => {
        $menu.append(`
            <li class="${index === 0 ? 'active' : ''}" data-name="${item.Name.replace(/\s+/g, "")}" data-description="${item.Description}">
                <a href="#">${item.Name}</a>
            </li>
        `);
        $('.menu-body').append(`
            <ul class="submenu ${item.Name.replace(/\s+/g, "")}">
                ${renderSubMenu(item.SubMenu)}
            </ul>
        `)
    })

    const $globalLinks = $menu.find('> li > a');
    let focusIndex = 0;
    let submenuOpen = false;
    let $subMenu = null;
    let $subLinks = null;
    let focusIndexSubmenu = 0;
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
                        let sectionName = $menu.find('li.active').data('name');
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
            case 'Escape':
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
                } else {
                    $globalLinks.parent().removeClass('active');
                    focusIndex = 0;
                    submenuOpen = false;
                }
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
            if (event.key === "ArrowDown" && activeItem !== lastItem) {
                event.preventDefault();
                if (activeItem.nextElementSibling.offsetTop > menuList.scrollTop + menuList
                    .clientHeight) {
                    console.log('this worked ?');
                    menuList.scrollTop = activeItem.nextElementSibling.offsetTop - menuList
                        .clientHeight;
                    console.log(activeItem.nextElementSibling.offsetTop, menuList
                        .clientHeight);
                }
                console.log(activeItem.nextElementSibling);
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

})