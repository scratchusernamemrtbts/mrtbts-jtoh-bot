const { CommandInteraction, EmbedBuilder, SlashCommandBuilder, ApplicationIntegrationType } = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
    .setDescription('Need help? Use this to get the support server link'),
  /**
   * 
   * @param {CommandInteraction} interaction - The interaction object
   */ 
  async execute(interaction){
    const helpEmbed = new EmbedBuilder()
    .setTitle('Help Menu')
    .setColor('#76F557')
    .addFields(
      { name: 'Support server', value: process.env.SUPPORT_SERVER, inline: false},
      { name: "Bot not sending message?", value: "Try asking the server administrator to give the bot send message permission", inline: false},
      { name: "Bot not responding?", value:"Let the owner know by joining the support server", inline: false},
      { name: "More questions?", value:`Contact us at email ${process.env.SUPPORT_EMAIL}`,inline:false},
    )
    await interaction.reply({embeds: [helpEmbed], ephemeral: true})
  }
}