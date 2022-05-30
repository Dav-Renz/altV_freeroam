import * as alt from "alt-server";
import * as chat from "chat";

const spawnsPos = [
    { x: 437.5912170410156, y: -623.037353515625, z: 28.8000000000000 } //zob  
];

const spawnsRot = [
      { x: 0, y: 0, z: 1.7810605764389038 } //zob  0, 0, 1.7810605764389038
  ];


const locations = [
    
    { x: -1481.1680000000000, y: -2860.9250000, z: 14.5000000000000 }, //runway
    { x: 437.5912170410156, y: -623.037353515625, z: 28.8000000000000 }, //zob
    { x: 132.480000, y: -1309.890000, z: 29.500000 }, // unicorn
    { x: 200.6637420654297, y: -935.2879028320312, z: 30.6783447265625 }, // legion
    { x: 193.0100000000000, y: -603.9100000000000, z: 20.1400000000000 }, // subway spawn
    { x: 3069.731933593750, y: -4702.470214843750, z: 15.2608642578125 }, // aircraft carrier
];

const locationsRot = [
    
    { x: -0, y: 0, z: 0 }, //runway
    { x: 0, y: 0, z: 1.7810605764389038 }, //zob
    { x: -0, y: 0, z: 0 }, // unicorn
    { x: -0, y: 0, z: 0 }, // legion
    { x: -0, y: 0, z: 0 }, // subway spawn
    { x: -0, y: 0, z: 0 }, // aircraft carrier
];


const spawnModels = ["csb_mweather", "a_f_m_bevhills_02", "IG_Maude"]; //"u_f_y_danceburl_01", "csb_mweather",

const weapons = [
  "dagger",
  "bat",
  "bottle",
  "crowbar",
  "flashlight",
  "golfclub",
  "hammer",
  "hatchet",
  "knuckle",
  "knife",
  "machete",
  "switchblade",
  "nightstick",
  "wrench",
  "battleaxe",
  "poolcue",
  "stone_hatchet",
  "pistol",
  "pistol_mk2",
  "combatpistol",
  "appistol",
  "stungun",
  "pistol50",
  "snspistol",
  "snspistol_mk2",
  "heavypistol",
  "vintagepistol",
  "flaregun",
  "marksmanpistol",
  "revolver",
  "revolver_mk2",
  "doubleaction",
  "raypistol",
  "microsmg",
  "smg",
  "smg_mk2",
  "assaultsmg",
  "combatpdw",
  "machinepistol",
  "minismg",
  "raycarbine",
  "pumpshotgun",
  "pumpshotgun_mk2",
  "sawnoffshotgun",
  "assaultshotgun",
  "bullpupshotgun",
  "musket",
  "heavyshotgun",
  "dbshotgun",
  "autoshotgun",
  "assaultrifle",
  "assaultrifle_mk2",
  "carbinerifle",
  "carbinerifle_mk2",
  "advancedrifle",
  "specialcarbine",
  "specialcarbine_mk2",
  "bullpuprifle",
  "bullpuprifle_mk2",
  "compactrifle",
  "mg",
  "combatmg",
  "combatmg_mk2",
  "gusenberg",
  "sniperrifle",
  "heavysniper",
  "heavysniper_mk2",
  "marksmanrifle",
  "marksmanrifle_mk2",
  "rpg",
  "grenadelauncher",
  "grenadelauncher_smoke",
  "minigun",
  "firework",
  "railgun",
  "hominglauncher",
  "compactlauncher",
  "rayminigun",
  "grenade",
  "bzgas",
  "smokegrenade",
  "flare",
  "molotov",
  "stickybomb",
  "proxmine",
  "snowball",
  "pipebomb",
  "ball",
];

let ruston;

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomListEntry(list) {
  return randomNumber(0, list.length - 1);
}



function giveParachute(player){
    player.giveWeapon(alt.hash("gadget_parachute"), 3, false);
}


function modVehicle(vehicle, player, modType, id) {
    try {

        chat.send(player, `modType: ${modType}; id: ${id}`);
        vehicle.setMod(modType, id);
    } catch (e) {
        alt.log(e);
        chat.send(player, `Irgendwas hat nicht geklappt`);
    }
}



function addCol(vehicle, type, nr, player) {
    switch (type) {
        case "prim":
            vehicle.primaryColor = nr;
            break;
        case "sec":
            vehicle.secondaryColor = nr;
            break;
        case "pearl":
            vehicle.pearlColor = nr;
            break;
        default:
            chat.send(player, `Fehler`);
    }
}

function setExtras(player, vehicle, id, bool){
    // var state;
    // if (bool==="true" || bool === true){
    //     state = true;
    // }
    // else if (bool==="false" || bool === false){
    //     state = false;
    // }
    // else {
    //     chat.send(player, `Das ist kein boolean du idiot!!`);
    //     alt.log(e);
    //     return;
    // }
    try {
        vehicle.setExtra(id, bool);
    } catch (e) {
        chat.send(player, `Irgendwas komisch`);
        alt.log(e);
    }
}

function toggleExtra(player, vehicle, id) {
    let status = vehicle.getExtra(id);

    try {
        if (status) {
            vehicle.setExtra(id, false);
        }
        else {
            vehicle.setExtra(id, true);
        }
    } catch (e) {
        chat.send(player, `Kaputt`);
        alt.log(e);
    }


    
}



function spawnVeh(player, model, pos, rot, max) {

    try {
        let vehicle = new alt.Vehicle(model, pos, rot);
        let pvehs = player.getMeta("vehicles");
        if (pvehs.length >= max) {
            let toDestroy = pvehs.pop();
            if (toDestroy != null) {
                toDestroy.destroy();
            }
        }
        pvehs.unshift(vehicle);
        player.setMeta("vehicles", pvehs);
        return vehicle;
    } catch (e) {
        alt.log(e);
        chat.send(player, `{ff0000} Vehicle Model {ff9500}${model} {ff0000}does not exist..`);
        
    }

}




alt.on('playerConnect', initialSpawn);



function initialSpawn (player) {
  if (player.name.includes("admin")) {
    player.kick();
    return;
  }

  if ((player.name.includes("Dav") || player.name.includes("dav")) && (player.name.includes("Renz") || player.name.includes("renz")) ) {
    player.model = "u_f_y_danceburl_01";
  }
  else if (player.name.includes("listhdev")) {
      player.model = "csb_stripper_02";
  }
  else {
      player.model = spawnModels[getRandomListEntry(spawnModels)];
  }


  player.setMeta("vehicles", []);
  player.setMeta("trains", []);
  let index = getRandomListEntry(spawnsPos);
  const spawn = spawnsPos[index];
  player.spawn(spawn.x, spawn.y, spawn.z, 0);
  player.rot = spawnsRot[index];
  alt.emitClient(player, "freeroam:spawned");
  alt.emitClient(player, "freeroam:Interiors");

  let connectTimeout = alt.setTimeout(() => {
    if (player && player.valid) {
      const playerCount = alt.Player.all.length;
      chat.broadcast(`{1cacd4}${player.name} {ffffff}has {00ff00}joined {ffffff}the Server..  (${playerCount} players online)`);
      chat.send(player, "{80eb34}Press {34dfeb}T {80eb34}and type {34dfeb}/help {80eb34}to see all available commands..");
    }
    alt.clearTimeout(connectTimeout);
  }, 1000);
}

alt.on("playerDeath", (player, killer, weapon) => {
    let index = getRandomListEntry(spawnsPos);
  const spawn = spawnsPos[index];
  alt.emitClient(player, "freeroam:switchInOutPlayer", false, 0, 2);
  let playerDeathTimeout = alt.setTimeout(() => {
    if (player && player.valid) {
      player.spawn(spawn.x, spawn.y, spawn.z, 0);
      player.rot = spawnsRot[index];
      alt.emitClient(player, "freeroam:switchInOutPlayer", true);
      player.clearBloodDamage();
    }
    alt.clearTimeout(playerDeathTimeout);
  }, 2000);
  if (killer) {
    alt.log(`${killer.name} gave ${player.name} the rest!`);
    SendNotificationToAllPlayer(`~r~<C>${killer.name}</C> ~s~killed ~b~<C>${player.name}</C>`);
  } else {
    alt.log(`${player.name} died!`);
    SendNotificationToAllPlayer(`~s~Suicide ~b~<C>${player.name}</C>`);
  }
});

function SendNotificationToPlayer(player, message, textColor = 0, bgColor = 2, blink = false) {
  alt.emitClient(player, "freeroam:sendNotification", textColor, bgColor, message, blink);
}

function SendNotificationToAllPlayer(message, textColor = 0, bgColor = 2, blink = false) {
  alt.emitAllClients("freeroam:sendNotification", textColor, bgColor, message, blink);
}

alt.on("playerDisconnect", (player, reason) => {
  const playerCount = alt.Player.all.length;
  chat.broadcast(`{1cacd4}${player.name} {ffffff}has {ff0000}left {ffffff}the Server.. (${playerCount} players online)`);
  player.getMeta("vehicles").forEach((vehicle) => {
    if (vehicle != null) {
      vehicle.destroy();
    }
  });
  player.setMeta("vehicles", undefined);
  alt.log(`${player.name} has leaved the server becauseof ${reason}`);
});


// =============================== Commands Begin ==================================================

chat.registerCmd("help", (player, args) => {
  chat.send(player, "{ff0000}========== {eb4034}HELP {ff0000} ==========");
  chat.send(player, "{ff0000}= {34abeb}/veh for more info");
  chat.send(player, "{ff0000}= {34abeb}/tp {40eb34}(targetPlayer)   {ffffff} Teleport to Player");
  chat.send(player, "{ff0000}= {34abeb}/model {40eb34}(modelName)   {ffffff} Change Player Model");
  chat.send(player, "{ff0000}= {34abeb}/weapon {40eb34}(weaponName)   {ffffff} Get specified weapon");
  chat.send(player, "{ff0000}= {34abeb}/weapons    {ffffff} Get all weapons");
  chat.send(player, "{ff0000}= {34abeb}/health    {ffffff} Gives full health");
  chat.send(player, "{ff0000}= {34abeb}/armour    {ffffff} Gives full armour");
  chat.send(player, "{ff0000} ========================");
});




chat.registerCmd("kill", (player, args) => {
    if ((player.name.includes("Dav") || player.name.includes("dav")) && (player.name.includes("Renz") || player.name.includes("renz")) ) {

        if (args && args.length === 0) {
            chat.send(player, "Usage: /kill (target player)");
            return;
        }
        const foundPlayers = alt.Player.all.filter((p) => p.name === args[0]);
        if (foundPlayers && foundPlayers.length > 0) {
            foundPlayers[0].health = 0;
            chat.send(player, `{1cacd4}${foundPlayers[0].name}{ffffff} wurde getötet!`);
        } else {
            chat.send(player, `{ff0000} Player {ff9500}${args[0]} {ff0000}not found..`);
        }
        return;
    }
    else {
        player.kick();
        return;
    }
  });

  chat.registerCmd("kick", (player, args) => {
    if ((player.name.includes("Dav") || player.name.includes("dav")) && (player.name.includes("Renz") || player.name.includes("renz")) ) {

        if (args && args.length === 0) {
            chat.send(player, "Usage: /kick (target player)");
            return;
        }
        const foundPlayers = alt.Player.all.filter((p) => p.name === args[0]);
        if (foundPlayers && foundPlayers.length > 0) {
            let grund = args[1];
            try {
                for (let i = 2; i < args.length; i++){
                    grund = grund.concat(" ", args[i]);
                }
            } catch (e) {
                alt.log(e);
            }
            foundPlayers[0].kick(grund);
            chat.send(player, `{1cacd4}${foundPlayers[0].name}{ffffff} wurde gekicked!`);
        } else {
            chat.send(player, `{ff0000} Player {ff9500}${args[0]} {ff0000}not found..`);
        }
        return;
    }
    else {
        player.kick();
        return;
    }
  });




chat.registerCmd("veh", (player, args) => {
    if (args.length === 0) {
      chat.send(player, "{ff0000}========== {eb4034}HELP Veh {ff0000} ==========");
      chat.send(player, "{ff0000}= {34abeb}/veh spawn {40eb34}(model)   {ffffff} Spawn vehicle model");
      chat.send(player, "{ff0000}= {34abeb}/veh repair {40eb34}   {ffffff} Repairs current vehicle");
      chat.send(player, "{ff0000}= {34abeb}/veh repair all {40eb34}   {ffffff} Repairs all your vehicles");
      chat.send(player, "{ff0000}= {34abeb}/veh del {40eb34}   {ffffff} Deletes current vehicle");
      chat.send(player, "{ff0000}= {34abeb}/veh del all {40eb34}   {ffffff} Deletes all your vehicles");
      chat.send(player, "{ff0000}= {34abeb}/veh mod {40eb34}(modType) (id)   {ffffff} Adds a modification to the vehicle");
      chat.send(player, "{ff0000}= {34abeb}/veh liv {40eb34}(id)   {ffffff} Changes the livery");
      chat.send(player, "{ff0000}= {34abeb}/veh extra {40eb34}(id)   {ffffff} Toggles an extra");
      chat.send(player, "{ff0000}= {34abeb}/veh plateText {40eb34}(Text)   {ffffff} Sets the plate text");
      chat.send(player, "{ff0000} ========================");

      return;
    }
    else if (args[0] === "spawn") {
        if (args[1]!=null) {
            let veh = spawnVeh(player, args[1], player.pos, player.rot, 50);
            player.setIntoVehicle(veh, 1);
            return;
        }
        else {
            chat.send(player, "Usage: /veh spawn (vehicleModel)");
            return;
        }
    }
    else if (args[0] === "pos") {
        if (player.vehicle == null) {
            chat.send(player, "Du befindest dich nicht in einem Fahrzeug");
            return;
        }
        let vehicle = player.vehicle;
        alt.log(`"pos": [ ${vehicle.pos.x}, ${vehicle.pos.y}, ${vehicle.pos.z} ],`);
        chat.send(player, `"pos": [ ${vehicle.pos.x}, ${vehicle.pos.y}, ${vehicle.pos.z} ],`);
        return;
    }
    else if (args[0] === "rot") {
        if (player.vehicle == null) {
            chat.send(player, "Du befindest dich nicht in einem Fahrzeug");
            return;
        }
        let vehicle = player.vehicle;
        alt.log(`"rot": [ ${vehicle.rot.x}, ${vehicle.rot.y}, ${vehicle.rot.z} ],`);
        chat.send(player, `"rot": [ ${vehicle.rot.x}, ${vehicle.rot.y}, ${vehicle.rot.z} ],`);
        return;
    }
    else if (args[0] === "repair") {
       
        if (args[1]==null) {
            if (player.vehicle == null) {
                chat.send(player, "Du befindest dich nicht in einem Fahrzeug");
                return;
            }
            try {
                player.vehicle.repair();
            } catch (e) {
                chat.send(player, `Fahrzeug konnte nicht repariert werden`);
                alt.log(e);
            }
            return;
        }
        else if (args[1]==="all") {
            if (args[2]==null) {
                try {
                    player.getMeta("vehicles").forEach((vehicle) => {
                        if (vehicle != null) {
                            vehicle.repair();
                        }
                    });
                } catch (e) {
                    chat.send(player, ``);
                    alt.log(e);
                }
                return;
            }
            else if (args[2]==="-all") {
                chat.send(player, `hoffentlich klappt das`);

                const vehs = alt.Vehicle.all; // Store it in a variable, so it doesn't create a copy of the array on each iteration
                for(let i = 0; i < vehs.length; i++){

                    try {
                            if (vehicle != null) {
                                vehicle.repair();
                            }
                    } catch (e) {
                        chat.send(player, `Hat nicht geklappt`);
                        alt.log(e);
                    }
                }
                return;
            }
        }
        else {
            chat.send(player, "Usage: '/veh repair' while in a vehicle");
            return;
        }
    }
    else if (args[0] === "del") {
        if (args[1]==null) {
            if (player.vehicle == null) {
                return;
            }
            try {
                player.vehicle.destroy();
            } catch (e) {
                chat.send(player, `Fahrzeug konnte nicht gelöscht werden`);
                alt.log(e);
            }
            return;
        }
        else if (args[1]==="all") {
            if (args[2]==null) {
                try {
                    player.getMeta("vehicles").forEach((vehicle) => {
                        if (vehicle != null) {
                            vehicle.destroy();
                        }
                    });
                } catch (e) {
                    chat.send(player, ``);
                    alt.log(e);
                }
                return;
            }
            else if (args[2]==="-all") {
                chat.send(player, `hoffentlich klappt das`);

                const players = alt.Player.all; // Store it in a variable, so it doesn't create a copy of the array on each iteration
                for(let i = 0; i < players.length; i++){

                    try {
                        players[i].getMeta("vehicles").forEach((vehicle) => {
                            if (vehicle != null) {
                                vehicle.destroy();
                            }
                        });
                    } catch (e) {
                        chat.send(player, `Hat nicht ohne Fehler geklappt`);
                        alt.log(e);
                    }
                }
                return;
            }
        }
    }
    else if (args[0] === "mod") {
        if (player.vehicle == null) {
            chat.send(player, "Du befindest dich nicht in einem Fahrzeug");
            return;
        }
        else if (args[1] === null || args[2] === null)  {
            chat.send(player, `Nicht ausreichende Parameter`);
            return;
        }
        else {
            let vehicle = player.vehicle;
            if (vehicle.modKitsCount > 0) {
                vehicle.modKit = 1;
                modVehicle(vehicle, player, args[1], args[2]); 
            }
            else {
                chat.send(player, `Keine ModKits verfügbar`);
            }
        }
        return;
    }
    else if (args[0] === "liv") {
        if (player.vehicle == null) {
            chat.send(player, "Du befindest dich nicht in einem Fahrzeug");
            return;
        }
        else if (args[1] === null)  {
            chat.send(player, `Nicht ausreichende Parameter`);
            return;
        }
        else {
            let vehicle = player.vehicle;
            try {
                vehicle.livery = args[1];
            } catch (e) {
                chat.send(player, `Irgendwas komisch`);
                alt.log(e);
            }
        }
        return;
    }
    else if (args[0] === "extra") {
        if (player.vehicle == null) {
            chat.send(player, "Du befindest dich nicht in einem Fahrzeug");
            return;
        }
        else if (args[1] === null)  {
            chat.send(player, `Nicht ausreichende Parameter`);
            return;
        }
        else {
            let vehicle = player.vehicle;
            
            try {
                toggleExtra(player, vehicle, args[1]);
            } catch (e) {
                chat.send(player, `Irgendwas komisch`);
                alt.log(e);
            }
        }
        return;
    }
    else if (args[0] === "setExtra") {
        if (player.vehicle == null) {
            chat.send(player, "Du befindest dich nicht in einem Fahrzeug");
            return;
        }
        else if (args[1] === null || args.length < 3)  {
            chat.send(player, `Nicht ausreichende Parameter`);
            return;
        }
        else {
            let vehicle = player.vehicle;
            let bool = false;
            if (args[2] === "true") {
                bool = true;
            }

            try {
                setExtras(player, vehicle, args[1], bool);
            } catch (e) {
                chat.send(player, `Irgendwas komisch`);
                alt.log(e);
            }
        }
        return;
    }
    else if (args[0] === "plateText") {
        if (player.vehicle == null) {
            chat.send(player, "Du befindest dich nicht in einem Fahrzeug");
            return;
        }
        else if (args[1] === null)  {
            chat.send(player, `Nicht ausreichende Parameter`);
            return;
        }
        else {
            let vehicle = player.vehicle;
            

            let string = args[1];
            
            for (let i = 2; i < args.length; i++) {
                string = string + ` ` + args[i];
            }

            try {
                vehicle.numberPlateText = string;
            } catch (e) {
                chat.send(player, `Irgendwas komisch`);
                alt.log(e);
            }
        }
        return;
    }
  });


// ---------------------------- PLAYER STUFF -------------------------------------



chat.registerCmd("model", (player, args) => {
  if (args.length === 0) {
    chat.send(player, "Usage: /model (modelName)");
    return;
  }
  player.model = args[0];

});

chat.registerCmd("armour", (player, args) => {
    player.armour = player.maxArmour;
});

chat.registerCmd("health", (player, args) => {
    player.health = player.maxHealth;
});


chat.registerCmd("stamina", (args) => {
    
    alt.emitClient(player, "freeroam:stamina");

});

chat.registerCmd("lung", (args) => {
    
    alt.emitClient(player, "freeroam:lung");

});


//-------------------------------------- WEAPON STUFF -----------------------------------------



chat.registerCmd("weapon", (player, args) => {
  if (args.length === 0) {
    chat.send(player, "Usage: /weapon (modelName)");
    return;
  }
  player.giveWeapon(alt.hash("weapon_" + args[0]), 9999, true);
});

chat.registerCmd("weapons", (player, args) => {
  for (let weapon of weapons) {
    player.giveWeapon(alt.hash("weapon_" + weapon), 999, true);
  }
});

chat.registerCmd("Fallschirm", (player, args) => {
    giveParachute(player);
  });


chat.registerCmd("ammo", (player, args) => {
    chat.send(player, "Geht noch nicht");
  });


//------------------------------ Teleport stuff ---------------------------

chat.registerCmd("tp", (player, args) => {
    if (args && args.length === 0) {
      chat.send(player, "Usage: /tp (target player)");
      return;
    }
    const foundPlayers = alt.Player.all.filter((p) => p.name === args[0]);
    if (foundPlayers && foundPlayers.length > 0) {

      player.pos = foundPlayers[0].pos;
      chat.send(player, `You got teleported to {1cacd4}${foundPlayers[0].name}{ffffff}`);
    } else {
      chat.send(player, `{ff0000} Player {ff9500}${args[0]} {ff0000}not found..`);
    }



  });

chat.registerCmd("teleport", (player, args) => {
    if (args.length === 0) {
        chat.send(player, "Usage: /teleport (location)");
        return;
    }

    if (args.length === 1) {
        try {
            alt.emitClient(player, "freeroam:switchInOutPlayer", false, 0, 2);

            let indexN = -1;
            let isDriver = false;
            switch (args[0]) {
                case "runway":
                    indexN = 0;
                    break;
                case "zob":
                    indexN = 1;
                    break;
                case "unicorn":
                    indexN = 2;
                    break;
                case "legion":
                    indexN = 3;
                    break;
                case "subwayspawn":
                    indexN = 4;
                    break;
                case "carrier":
                    indexN = 5;
                default:
                    chat.send(player, `Location ${args[0]} gibts nicht`);
            }

            if (indexN === -1) {
                chat.send(player, `Ordentlich verkackt`)
                alt.emitClient(player, "freeroam:switchInOutPlayer", true);
            }
            if (player.vehicle != null) {
                if(player.vehicle.driver==player){
                    isDriver=true;
                }
            }
            else {
                isDriver = false;
            }
            setTimeout(function () {
                alt.emitClient(player, "freeroam:switchInOutPlayer", true);
                const location = locations[indexN];
                const locationRot = locationsRot[indexN];
                if (isDriver == true) {
                    let vehicle = player.vehicle;
                    //player.pos = location;
                    //player.rot =locationRot;
                    vehicle.pos = location;
                    vehicle.rot = locationRot;
                    player.setIntoVehicle(vehicle, 1);
                }
                else {
                    player.pos = location;
                    player.rot = locationRot;
                }
            }, 2200);
            
        } catch (e) {
            chat.send(player, `verkackt`);
            alt.log(e);
        }
    }
    else if (args.length === 3) {
        try {
            alt.emitClient(player, "freeroam:switchInOutPlayer", false, 0, 2);
            setTimeout(function () {
                player.spawn(args[0], args[1], args[2], 0);
                alt.emitClient(player, "freeroam:switchInOutPlayer", true);
            }, 1200);
        } catch (e) {
            chat.send(player, `verkackt`);
            alt.log(e);
        }
    }

    else if (args.length === 4) {
        try {
            alt.emitClient(player, "freeroam:switchInOutPlayer", false, 0, 2);

            setTimeout(function () {
                player.spawn(args[0], args[1], args[2], args[3]);
                alt.emitClient(player, "freeroam:switchInOutPlayer", true);
            }, 1200);
        } catch (e) {
            chat.send(player, `verkackt`);
            alt.log(e);
        }
    }

    else {
        chat.send(player, `Befehl in dieser Form ung�ltig`);
    }
});



//------------------------------ ADMIN COMMANDS -------------------------------------------


chat.registerCmd("ruston", (player, args) => {
    try {

        if (ruston == null) {
            let vehicle = new alt.Vehicle("ruston", player.pos, player.rot);
            //vehicle.manualEngineControl = true;
            vehicle.modKit = 1;
            ruston = vehicle;
            player.setIntoVehicle(vehicle, 1);
        }
        else {
            let vehicle = ruston;
            vehicle.pos = player.pos;
            vehicle.rot = player.rot;
            player.setIntoVehicle(vehicle, 1);
        }
    } catch (e) {
        alt.log(e);
    }
});


chat.registerCmd("tptome", (player, args) => {
    if (args && args.length === 0) {
        chat.send(player, "Usage: /tp (target player)");
        return;
    }
    const foundPlayers = alt.Player.all.filter((p) => p.name === args[0]);
    if (foundPlayers && foundPlayers.length > 0) {
        foundPlayers[0].pos = player.pos;
        chat.send(foundPlayers[0], `You got teleported to {1cacd4}${player.name}{ffffff}`);
    } else {
        chat.send(player, `{ff0000} Player {ff9500}${args[0]} {ff0000}not found..`);
    }
});

chat.registerCmd("tpalltome", (player, args) => {
    
    const foundPlayers = alt.Player.all;
    if (foundPlayers && foundPlayers.length > 0) {
        for (let i = 0; i < foundPlayers.length; i++) {
            foundPlayers[i].pos = player.pos;
            chat.send(foundPlayers[i], `You got teleported to {1cacd4}${player.name}{ffffff}`);
        }
    } else {
        chat.send(player, `{ff0000} Player {ff9500}${args[0]} {ff0000}not found..`);
    }
});


chat.registerCmd("setTime", (player, args) => {
    player.setDateTime(args[0], args[1], args[2], args[3], args[4], args[5]);
});


// ------------------------ INFO / DEBUG COMMANDS ---------------------------------------


chat.registerCmd("pos", (player, args) => {
    alt.log(`Position: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`);
    chat.send(player, `Position: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`);
  });
  
chat.registerCmd("rot", (player, args) => {
    alt.log(`Rotation: ${player.rot.x}, ${player.rot.y}, ${player.rot.z}`);
    chat.send(player, `Rotation: ${player.rot.x}, ${player.rot.y}, ${player.rot.z}`);
  });


chat.registerCmd("info", (player, args) => {

    if (player.vehicle == null) {
        chat.send(player, "Du befindest dich nicht in einem Fahrzeug");
        return;
    }
    let vehicle = player.vehicle;
    
    try{
        alt.log(`{`);
        alt.log(`"model": "",`);
        alt.log(`"pos": [ ${vehicle.pos.x}, ${vehicle.pos.y}, ${vehicle.pos.z} ],`);
        alt.log(`"rot": [ ${vehicle.rot.x}, ${vehicle.rot.y}, ${vehicle.rot.z} ],`);
        alt.log(`"manualEngine": ${vehicle.manualEngineControl},`);
        alt.log(`"modKit": ${vehicle.modKit},`);
        alt.log(`"mods": [],`);
        alt.log(`"modsID": [],`);
        alt.log(`"primCol": ${vehicle.primaryColor},`);
        alt.log(`"secCol": ${vehicle.secondaryColor},`);
        alt.log(`"pearlCol": ${vehicle.pearlColor},`);
        alt.log(`"roofState": ${vehicle.roofState},`);
        alt.log(`"numberPlateText": "${vehicle.numberPlateText}"`);
        alt.log(`}`);
        chat.send(player, `Informationen über das Fahrzeug wurden in die Konsole geschrieben`);
    } catch (e) {
        alt.log(e);
        chat.send(player, `Es gab einen Fehler`);
    }
});


// =============================== Commands End ====================================================

