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
