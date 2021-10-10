import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class SkipCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["skip", "pular"],
            requirements: {
                voiceChannelOnly: true,
                needsGuildPlayer: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        ctx.guildPlayer!.stop();
        ctx.reply("A musica foi pulada com sucesso!");
    }
}
