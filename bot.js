const Discord = require("discord.js")
const client = new Discord.Client();       
const ayarlar = require("./ayarlar.json")    
const fs = require("fs");                
require('./util/eventLoader.js')(client);     

client.login(ayarlar.token)

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();  
fs.readdir('./komutlar/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`[Waron Stüdyo TR] ${files.length} komut yükleniyor...`);
  files.forEach(f => {                      
    let komutlar = require(`./komutlar/${f}`);   
    console.log(`${komutlar.config.name} komutu yüklendi.`);    
    client.commands.set(komutlar.config.name, komutlar);
    komutlar.config.aliases.forEach(alias => {          
      client.aliases.set(alias, komutlar.config.name);  
    });
  });
})


client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

