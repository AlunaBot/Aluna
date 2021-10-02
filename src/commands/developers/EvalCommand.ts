import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";
import util from "util";

export default class EvalCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["eval"],
            requirements: {
                devOnly: true
            },
            parameters: [
                {
                    type: "string",
                    errorMessage: "Ae bro, cade o conteudo???",
                    full: true
                }
            ]
        })
    }
    async execute(ctx: CommandContext, toEval: string) {
        try {
            let code = toEval

            if (code.startsWith("```js\n"))
                code = code.substring(5, code.length - 3);
            let evaled = await eval(code);
            evaled = util.inspect(evaled, { depth: 0 });
            evaled = this.clean(
                evaled.replace(
                    new RegExp(`${process.env.TOKEN}`, "g"),
                    "undefined"
                )
            );
            if (evaled.length > 1900) evaled = `${evaled.slice(0, 1800)}...`;
            evaled = `\`\`\`js\n${evaled}\`\`\``;
            await ctx.channel.createMessage(evaled);
        } catch (err) {
            await ctx.channel.createMessage(
                `\`\`\`js\n${util.inspect(err, { depth: 1 })}\`\`\``
            );
        }
    }
    clean(text: string) {
        const blankSpace = String.fromCharCode(8203);
        return typeof text === "string"
            ? text
                .replace(/`/g, "`" + blankSpace)
                .replace(/@/g, "@" + blankSpace)
            : text;
    }
}