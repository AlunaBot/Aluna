import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class LoopCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["loop", "repetir"],
            requirements: {
                needsGuildPlayer: true,
                voiceChannelOnly: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        let queue = ctx.guildPlayer?.queue!;
        if (queue?.loop) {
            queue.loop = false;
            ctx.beautifulReply("🔁", "A musica atual não irá mais se repetir!");
        } else {
            queue.loop = false;
            ctx.beautifulReply("🔁", "A musica atual irá se repetir agora!");
        }
    }
}
