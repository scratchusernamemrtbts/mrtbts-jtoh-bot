const { REST, Routes } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')
const dotenv = require('dotenv')
const { log } = require('./helpers/logging')

const commands = []
dotenv.config()
const foldersPath = path.join(__dirname,'commands')
const commandFolders = fs.readdirSync(foldersPath)

if(process.env.DEV){
  clientId = process.env.DEV_CLIENT_ID
  token = process.env.DEV_DISCORD_TOKEN
} else {
  clientId = process.env.CLIENT_ID
  token = process.env.DISCORD_TOKEN
}


for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder)
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON())
    } else {
      console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
  }
}

const rest = new REST().setToken(token);

(async () => {
  try { 
    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body : commands },
    )
  } catch (e) {
    log(e,'error')
  }
})()