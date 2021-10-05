import { CommandContext } from "../structures/command";
import AlunaClient from "../AlunaClient";
import { Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

export default class MessageListener {
    public client: AlunaClient
    public name: string
    constructor(client: AlunaClient) {
        this.client = client
        this.name = "messageCreate"
    }

    run(message: Message): void {
        let prefix = "!"

        if (message.author.bot || message.guild === null) return;
        if (message.content.startsWith(`<@!${this.client.user?.id}>`)) {
            let embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setFooter(this.client.user?.username!, this.client.user?.displayAvatarURL())
                .setThumbnail(message.guild.iconURL() ?? this.client.user?.displayAvatarURL()!)
                .setColor("RANDOM")
                .setDescription(`** ** \n**Olá, meu nome é ${this.client.user?.username} e meu prefixo é ${prefix}**\n\`\`\`md\n* Se você precisa de mais ajuda, digite ${prefix}help.\`\`\``)
            
            let row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel("Me Adicione!")
                    .setStyle("LINK")
                    .setEmoji("🙋‍♀️")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user?.id}&permissions=0&scope=bot%20applications.commands`)
                )
            message.channel.send({
                embeds: [
                    embed
                ],
                components: [
                    row
                ]
            })
            return;
        }


        if (!message.content.startsWith(prefix)) return;
        let args = message.content.trim().slice(prefix.length).split(/ /g)
        let commandName = args.shift()?.toLowerCase()!



        let command = this.client.commandManager.get(commandName)
        if (!command) return;

        let context = new CommandContext(this.client, {
            command,
            message,
            args,
            author: message.author,
            channel: message.channel,
            guild: message.guild
        })
        command._execute(context)
    }
}