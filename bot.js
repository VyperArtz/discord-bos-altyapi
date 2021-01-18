const Discord = require("discord.js")
const client = new Discord.Client();       
const ayarlar = require("./ayarlar.json")    
const fs = require("fs");                
require('./util/eventLoader.js')(client);     

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();  
fs.readdir('./komutlar/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`[Waron Stüdyo TR] ${files.length} komut yükleniyor...`);
  files.forEach(f => {                      
    let komutlar = require(`./komutlar/${f}`);   
    console.log(`${komutlar.ayarlar.name} komutu yüklendi.`);    
    client.commands.set(komutlar.ayarlar.name, komutlar);
    komutlar.ayarlar.aliases.forEach(alias => {          
      client.aliases.set(alias, komutlar.ayarlar.name);  
    });
  });
})

client.login(ayarlar.token)
