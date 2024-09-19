const { CommandInteraction, SlashCommandBuilder, ApplicationIntegrationType, PermissionFlagsBits } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('talk')
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .setDescription('Admins can use this command to make the bot send a message')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The message to send')
        .setRequired(true)),
  /**
   *
   * @param {CommandInteraction} interaction - The interaction object
   */
  async execute(interaction){
    await interaction.deferReply({ephemeral: true})
    if(interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) {
      msgToSend = interaction.options.get('message').value
      await interaction.client.channels.cache.get(interaction.channelId).send(msgToSend)
      await interaction.followUp({content: 'Sent', ephemeral: true})
    } else {
      interaction.followUp({content: 'You have no permission',ephemeral: true})
    }
  }
}