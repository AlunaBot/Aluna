import { CommandContext } from "../..";
import { ParameterInterface } from "./Parameter";

export default function string(options: StringInterface): StringInterface {
    return {
        ...options,
        required: options.required ?? true,

        parse(ctx: CommandContext, argument: string | undefined, opt: StringInterface) {
            argument = argument ? (typeof argument === 'string' ? argument : argument as string) : undefined
            if (opt.required && !argument) throw new Error(opt.errorMessage)

            return argument;
        }
    }
}

interface StringInterface extends ParameterInterface {}