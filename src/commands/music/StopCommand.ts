import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class StopCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["stop"],
            requirements: {
                needsGuildPlayer: true,
                voiceChannelOnly: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        ctx.guildPlayer?.stop();
    }
}
