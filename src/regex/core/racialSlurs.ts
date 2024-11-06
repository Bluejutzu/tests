// deno-lint-ignore-file
import { sendMessageToWebhook } from "../../discord/webhook/sendToWebhook.ts";
import { getDate } from "../utils/index.ts";
import { data } from "./data.ts";
import { validateRegex } from "../utils/index.ts";
import fs from "node:fs";
import path from "node:path";

const defaultMatchers = data.defaultMatchers;

export const logResults = (
    testWords: string[],
    useDefaultMatchers: boolean,
    logToFile: boolean,
    useWebhook: boolean,
    userMatchers?: { [key: string]: RegExp[] }
) => {
    const matchers = useDefaultMatchers ? defaultMatchers : userMatchers;

    if (!matchers) {
        console.error("No matchers provided and default matchers are not used.");
        return;
    }

    const wordsToTest = testWords.length > 0 ? testWords : Object.values(data.testTerms).flat();

    let results: string[] = [];
    let webhookFields: any = []; 

    wordsToTest.forEach(term => {
        let output = `## Testing: ${term}\n`;
        let matcherResults = "";

        for (const [key, regexArray] of Object.entries(matchers)) {
            const matchResult = regexArray.some(matcher => validateRegex(term, matcher));
            matcherResults += `${matchResult ? "+ " : "- "}${key} Match: ${matchResult}\n`;
            output += `**${key}** Match: \`${matchResult}\`\n`;
        }

        output += `---\n`;
        results.push(output);

        webhookFields.push({
            name: `Testing: ${term}`,
            value: `\`\`\`diff\n${matcherResults}\`\`\``,
            inline: false
        });
    });

    if (logToFile) {
        const logDirectory = path.join(import.meta.dirname!, "logs");
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }

        const dateString = getDate()
        const logFilePath = path.join(logDirectory, `results_${dateString}.md`);

        fs.writeFileSync(logFilePath, results.join(""));
    }

    if (useWebhook) {
        sendMessageToWebhook(webhookFields, getDate());
    }
};
