import * as alt from "alt-server";
import * as chat from "chat";
import * as sm from "simplymongo";
//import json from "./fuhrpark.json";

const db = sm.getDatabase();


const spawnsPos = [
  //{ x: -695.1956176757812, y: 83.94725036621094, z: 55.85205078125 },
  //{ x: -527.6835327148438, y: -678.7252807617188, z: 33.6607666015625 }, //snr. muffin
  //{ x: 200.6637420654297, y: -935.2879028320312, z: 30.6783447265625 }, // legion square
  //{ x: 897.7318725585938, y: -1054.6944580078125, z: 32.818359375 },
  //{ x: 363.1516418457031, y: -2123.156005859375, z: 16.052734375 },
  //{ x: -265.3582458496094, y: -1898.0703125, z: 27.7464599609375 },
    { x: 437.5912170410156, y: -623.037353515625, z: 28.8000000000000 }, //zob  
  //{ x: -1481.1680000000000, y: -2860.9250000, z: 14.3000000000000 }, //lsia runway
];

const spawnsRot = [
    //{ x: -695.1956176757812, y: 83.94725036621094, z: 55.85205078125 },
    //{ x: -527.6835327148438, y: -678.7252807617188, z: 33.6607666015625 }, //snr. muffin
    //{ x: 200.6637420654297, y: -935.2879028320312, z: 30.6783447265625 }, // legion square
    //{ x: 897.7318725585938, y: -1054.6944580078125, z: 32.818359375 },
    //{ x: 363.1516418457031, y: -2123.156005859375, z: 16.052734375 },
    //{ x: -265.3582458496094, y: -1898.0703125, z: 27.7464599609375 },
      { x: 0, y: 0, z: 1.7810605764389038 }, //zob  0, 0, 1.7810605764389038
    //{ x: -1481.1680000000000, y: -2860.9250000, z: 14.3000000000000 }, //lsia runway
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

const allowedUsers = [
  "625ff9b8b7039243df5fc205",
  "626006167700434b7813a25e"
];


//const jsonData= require('./fuhrpark.json'); 

let train;
let ruston;
let haenger;
let fuhrpark = [];
let neue_GF;
let fuhrpark_gespawnt = false;
//let fahrzeuglisteJson = json;
let fahrzeuglisteArr;

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomListEntry(list) {
  return randomNumber(0, list.length - 1);
}



function deleteFuhrpark() {
    fuhrpark.forEach((vehicle) => {
        if (vehicle != null) {
            vehicle.destroy();
        }
    });
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


function spawnFromList(player) {

    try {
        fahrzeuglisteArr = fahrzeuglisteJson.vehicles;

        for (let i = 0; i < fahrzeuglisteArr.length; i++) {

            let fahrzeug = fahrzeuglisteArr[i];
            let vehicle = new alt.Vehicle(fahrzeug.model, fahrzeug.pos[0], fahrzeug.pos[1], fahrzeug.pos[2], fahrzeug.rot[0], fahrzeug.rot[1], fahrzeug.rot[2]);
            fuhrpark.unshift(vehicle);
            vehicle.manualEngineControl = fahrzeug.manualEngine;

            if (vehicle.modKitsCount > 0) {
                vehicle.modKit = fahrzeug.modKit;
                for (let j = 0; j < fahrzeug.mods.length; j++) {
                    vehicle.setMod(fahrzeug.mods[j], fahrzeug.modsID[j]);
                }
            }

            if (fahrzeug.primCol != null) {
                addCol(vehicle, "prim", fahrzeug.primCol, player);
            }
            if (fahrzeug.secCol != null) {
                addCol(vehicle, "sec", fahrzeug.secCol, player);
            }
            if (fahrzeug.pearlCol != null) {
                addCol(vehicle, "pearl", fahrzeug.pearlCol, player);
            }
            if (fahrzeug.roofState != null) {
                vehicle.roofState = fahrzeug.roofState;
            }
            if (fahrzeug.numberPlateText != null) {
                vehicle.numberPlateText = fahrzeug.numberPlateText;
            }
            
        }        
    } catch (e) {
        alt.log(e);
    }
}


function spawnFuhrpark(player) {
    spawnFromList(player);
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
    var state;
    if (bool==="true" || bool === true){
        state = true;
    }
    else if (bool==="false" || bool === false){
        state = false;
    }
    else {
        chat.send(player, `Das ist kein boolean du idiot!!`);
        alt.log(e);
        return;
    }
    try {
        vehicle.setExtra(id, state);
        } catch (e) {
            chat.send(player, `Irgendwas komisch`);
            alt.log(e);
        }
}

function bus3ExtraState(player, state){

    if (player.vehicle === null) {
        chat.send(player, "Du befindest dich nicht in einem Fahrzeug");
        return;
    }
    let vehicle = player.vehicle;

    if (state === null){
        chat.send(player, "Du hast keinen Zustand definiert. Default angenommen");
        setExtras(player, vehicle, 3, false);
        setExtras(player, vehicle, 2, false);
        setExtras(player, vehicle, 1, false);
        setExtras(player, vehicle, 0, true);
        return;
    }

    switch (state) {
        case "0":
            setExtras(player, vehicle, 3, false);
            setExtras(player, vehicle, 2, false);
            setExtras(player, vehicle, 1, false);
            setExtras(player, vehicle, 0, true);
            break;
        case "1":
            setExtras(player, vehicle, 0, false);
            setExtras(player, vehicle, 1, true);
            setExtras(player, vehicle, 2, false);
            setExtras(player, vehicle, 3, false);
            break;
        case "2":
            setExtras(player, vehicle, 0, false);
            setExtras(player, vehicle, 1, true);
            setExtras(player, vehicle, 2, true);
            setExtras(player, vehicle, 3, false);
            break;
        case "3":
            setExtras(player, vehicle, 0, false);
            setExtras(player, vehicle, 1, true);
            setExtras(player, vehicle, 2, false);
            setExtras(player, vehicle, 3, true);
            break;
        case "4":
            setExtras(player, vehicle, 0, false);
            setExtras(player, vehicle, 1, true);
            setExtras(player, vehicle, 2, true);
            setExtras(player, vehicle, 3, true);
            break;
        default:
            chat.send(player, `Default Zustand`);
            setExtras(player, vehicle, 3, false);
            setExtras(player, vehicle, 2, false);
            setExtras(player, vehicle, 1, false);
            setExtras(player, vehicle, 0, true);
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




alt.on('playerConnect', showAuthWindow);

//function playerConnect(player) {
//    alt.emit('discord:BeginAuth', player);
//}

function showAuthWindow(player) {
    alt.emitClient(player, 'auth:Open');
    console.log(`${player.name} has connected!`);
}

alt.on('auth:Done', exitAuthWindow);

function exitAuthWindow(player, id, username, email) {
    alt.emitClient(player, 'auth:Exit');
    console.log(`${player.name} has authenticated!`);
    console.log(`Their Database ID is: ${id}`);
    initialSpawn(player, id, username, email);
}


//alt.on('discord:AuthDone', playerAuthDone);

//function playerAuthDone(player, discordInfo) {
//    console.log(discordInfo);
//    initialSpawn(player);
//}


function initialSpawn (player, id, username, email) {
  if (player.name.includes("admin")) {
    player.kick();
    return;
  }
/* 
  if ((player.name.includes("Dav") || player.name.includes("dav")) && (player.name.includes("Renz") || player.name.includes("renz")) ) {
    player.model = "u_f_y_danceburl_01";
  }
  else if (player.name.includes("listhdev")) {
      player.model = "csb_stripper_02";
  }
  else {
      player.model = spawnModels[getRandomListEntry(spawnModels)];
  } */

  const models = await db.fetchAllByField('username', username, 'models');

  if (models.length <= 0) {
    player.model = spawnModels[getRandomListEntry(spawnModels)];
  }
  else {
    player.model = models[0].model;
  } 


  player.setMeta("vehicles", []);
  player.setMeta("trains", []);
  player.setMeta("username", username)
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
      chat.send(player, "Usage: /veh (vehicleModel)");

      chat.send(player, "{ff0000}========== {eb4034}HELP Veh {ff0000} ==========");
      chat.send(player, "{ff0000}= {34abeb}/veh spawn {40eb34}(model)   {ffffff} Spawn vehicle model");
      chat.send(player, "{ff0000}= {34abeb}/veh repair {40eb34}   {ffffff} Repairs current vehicle");
      chat.send(player, "{ff0000}= {34abeb}/veh del {40eb34}   {ffffff} delete vehicle");
      chat.send(player, "{ff0000}= {34abeb}/weapon {40eb34}(weaponName)   {ffffff} Get specified weapon");
      chat.send(player, "{ff0000}= {34abeb}/weapons    {ffffff} Get all weapons");
      chat.send(player, "{ff0000} ========================");

      return;
    }
    else if (args[0] === "spawn") {
        if (args[1]!=null) {
            let veh = spawnVeh(player, args[1], player.pos, player.rot, 20);
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
        else if (args[1] === null || args[2] === null)  {
            chat.send(player, `Nicht ausreichende Parameter`);
            return;
        }
        else {
            let vehicle = player.vehicle;
            try {
                vehicle.setExtra(args[1],args[2]);
            } catch (e) {
                chat.send(player, `Irgendwas komisch`);
                alt.log(e);
            }
        }
        return;
    }
  });

chat.registerCmd("pos", (player, args) => {
  alt.log(`Position: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`);
  chat.send(player, `Position: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`);
});

chat.registerCmd("rot", (player, args) => {
    alt.log(`Rotation: ${player.rot.x}, ${player.rot.y}, ${player.rot.z}`);
    chat.send(player, `Rotation: ${player.rot.x}, ${player.rot.y}, ${player.rot.z}`);
  });

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

chat.registerCmd("model", (player, args) => {
  if (args.length === 0) {
    chat.send(player, "Usage: /model (modelName)");
    return;
  }
  player.model = args[0];

  let username = player.getMeta("username");

  const document = {
      username,
      model: args[0]
  };

  const dbData = await db.insertData(document, 'models', true);

});

chat.registerCmd("bus3state", (player, args) => {
    if (args.length === 0) {
      chat.send(player, "Usage: /bus3state (number between 0 and 4)");
      return;
    }
    bus3ExtraState(player, args[0]);
  });
  

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

chat.registerCmd("teleport", (player, args) => {
    if (args.length === 0) {
        chat.send(player, "Usage: /teleport (location)");
        return;
    }

    if (args.length === 1) {
        try {
            alt.emitClient(player, "freeroam:switchInOutPlayer", false, 0, 2);

            let indexN = -1;
            let inCar = false;
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
                inCar = true;
            }
            else {
                inCar = false;
            }
            setTimeout(function () {
                alt.emitClient(player, "freeroam:switchInOutPlayer", true);
                const location = locations[indexN];
                const locationRot = locationsRot[indexN];
                if (inCar == true) {
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

chat.registerCmd("armour", (player, args) => {
    player.armour = player.maxArmour;
});

chat.registerCmd("leben", (player, args) => {
    player.health = player.maxHealth;
});

chat.registerCmd("engine", (player, args) => {

    if (player.vehicle == null) {
        return;
    }
    try {
        if (player.vehicle.engineOn === false) {
            player.vehicle.engineOn = true;
            chat.send(player, "Motor angeschaltet");
        }
        else if(player.vehicle.engineOn===true) {
            player.vehicle.engineOn = false;
            chat.send(player, "Motor ausgeschaltet");
        }
    } catch (e) {
        chat.send(player, `verkackt`);
        alt.log(e);
    }
});

chat.registerCmd("engineon", (player, args) => {

    if (player.vehicle == null) {
        return;
    }
    try {
            player.vehicle.engineOn = true;
            chat.send(player, "Motor angeschaltet");
    } catch (e) {
        chat.send(player, `verkackt`);
        alt.log(e);
    }
});

chat.registerCmd("engineoff", (player, args) => {

    if (player.vehicle == null) {
        return;
    }
    try {
        player.vehicle.engineOn = false;
        chat.send(player, "Motor ausgeschaltet");
    } catch (e) {
        chat.send(player, `verkackt`);
        alt.log(e);
    }
});

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

chat.registerCmd("zug", (player, args) => {
    try {
        let speed = 0
        if (args.length === 0) {
            speed = 5;
        }
        else {
            speed = args[0];
        }

        let tram1 = new alt.Vehicle(alt.hash("metrotrain"), 193, -603, 16, 0, 0, 0);
        tram1.isMissionTrain = false;
        tram1.trainTrackId = 3;
        tram1.setTrainEngineId(null);
        tram1.trainConfigIndex = 25;
        tram1.trainDistanceFromEngine = 0;
        tram1.isTrainEngine = true; // Make this train the engine of the whole train
        tram1.isTrainCaboose = false;
        tram1.trainDirection = false;
        tram1.trainPassengerCarriages = false; // Disable this train as a passenger carriage
        tram1.trainRenderDerailed = false;
        tram1.trainForceDoorsOpen = false;
        tram1.trainCruiseSpeed = speed;
        tram1.trainCarriageConfigIndex = 1;
        tram1.setTrainLinkedToForwardId(null);
        
        let tram2 = new alt.Vehicle(alt.hash("metrotrain"), 193, -603, 16, 0, 0, 0);
        tram2.isMissionTrain = false;
        tram2.trainTrackId = 3;
        tram2.setTrainEngineId(tram1);
        tram2.trainConfigIndex = 25;
        tram2.trainDistanceFromEngine = 0;
        tram2.isTrainEngine = false; // Disable this train as the engine of the whole train
        tram2.isTrainCaboose = false;
        tram2.trainDirection = true;
        tram2.trainPassengerCarriages = true; // Make this train as a passenger carriage
        tram2.trainRenderDerailed = false;
        tram2.trainForceDoorsOpen = true;
        tram2.trainCarriageConfigIndex = 1;

        tram2.setTrainLinkedToBackwardId(null); // Link no train to the back of this vehicle2
        tram2.setTrainLinkedToForwardId(tram1); // Link vehicle to the front of the vehicle
        tram1.setTrainLinkedToBackwardId(tram2); // Link vehicle2 to the back of the vehicle
        
        let ptrains = player.getMeta("trains");
        if (ptrains.length > 8) {
            let toDestroy = ptrains.pop();
            if (toDestroy != null) {
                toDestroy.destroy();
            }
        }
        ptrains.unshift(tram1);
        ptrains.unshift(tram2);
        
        player.setMeta("trains", ptrains);

        alt.log("zug erstellt");
        chat.send(player, "zug wurde erstellt");

    } catch (e) {
        alt.log(e);
    }
});

chat.registerCmd("zugloeschen", (player, args) => {

    let ptrains = player.getMeta("trains");

    for (let i = 0; i < ptrains.length; i++) {
        let toDestroy = ptrains.pop();
        if (toDestroy != null) {
            toDestroy.destroy();
        }
    }
    chat.send(player, "Z�ge wurde entfernt")

});

chat.registerCmd("tpZug", (player, args) => {
    
    if (train != null) {
        player.pos = train.pos;
        chat.send(player, `You got teleported to the train`);
    } else {
        chat.send(player, `versuchs sp�ter nochmal`);
    }
});

//chat.registerCmd("fuhrpark", (player, args) => {
//    if (args.length === 0) {
//        if (fuhrpark_gespawnt === false) {
//            spawnFuhrpark(player);
//            fuhrpark_gespawnt = true;
//            chat.send(player, `Fuhrpark wurde gespawnt`);
//        }
//        else {
//            chat.send(player, `Fuhrpark bereits gespawnt`);
//        }
//    }
//    else if (args[0] === "force") {
//        spawnFuhrpark(player);
//        fuhrpark_gespawnt = true;
//        chat.send(player, `Fuhrpark wurde gespawnt`);
//    }
//    else if (args[0] === "del") {
//        try {
//            if (fuhrpark.length === 0) {
//                deleteFuhrpark();
//            }
//            else {
//                deleteFuhrpark();
//                chat.send(player, `Fuhrpark wurde gel�scht`);
//            }
//        } catch (e) {
//            alt.log(e);
//        }
//        fuhrpark_gespawnt = false;
//    }
//});

chat.registerCmd("haenger", (player, args) => {
    try {
        let vehicle = new alt.Vehicle("xdtrailer", player.pos, player.rot);
        haenger = vehicle;
    } catch (e) {
        alt.log(e);
    }
});

chat.registerCmd("haengerpos", (player, args) => {
    
    alt.log(`"pos": [ ${haenger.pos.x}, ${haenger.pos.y}, ${haenger.pos.z} ],`);
    chat.send(player, `"pos": [ ${haenger.pos.x}, ${haenger.pos.y}, ${haenger.pos.z} ],`);
});

chat.registerCmd("haengerrot", (player, args) => {
    alt.log(`"rot": [ ${haenger.rot.x}, ${haenger.rot.y}, ${haenger.rot.z} ],`);
    chat.send(player, `"rot": [ ${haenger.rot.x}, ${haenger.rot.y}, ${haenger.rot.z} ],`);
});

chat.registerCmd("test", (player, args) => {
    alt.log(`Test`);
    try{
        player.health = 0;
    } catch (e) {
        alt.log(e);
    }
    
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


//beispiel infos

/*

"model": "rt3000",
      "pos": [ 433.26593017578125, -610.958251953125, 27.830810546875 ],
      "rot": [ 0.000040216920751845464, 0.0009761358378455043, 1.4884426593780518 ],
      "manualEngine": false,
      "modKit": 1,
      "mods": [],
      "modsID": [],
      "primCol": 84,
      "secCol": 12,
      "pearlCol": 70,
      "roofState": false,
      "numberPlateText": "Barry"

*/
