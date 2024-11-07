// deno-lint-ignore-file
import { sendMessageToWebhook } from "../../discord/webhook/sendToWebhook.ts";
import { getDate, validateRegex } from "../utils/index.ts";
import { data } from "./data.ts";
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
        let output = `## Testing: ${term}\n`; // Fixed the missing backticks
        let matcherResults = "";

        for (const [key, regexArray] of Object.entries(matchers)) {
            const matchResult = regexArray.some(matcher => validateRegex(term, matcher));
            matcherResults += `${matchResult ? "+ " : "- "}${key} Match: ${matchResult}\n`; // Fixed template literals
            output += `**${key}** Match: \`${matchResult}\`\n`; // Fixed template literals
        }

        output += `---\n`;
        results.push(output);

        webhookFields.push({
            name: `Testing: ${term}`,
            value: `\`\`\`diff\n${matcherResults}\n\`\`\``, // Fixed formatting for code block
            inline: false
        });
    });

    if (logToFile) {
        const logDirectory = path.join(import.meta.dirname!, "logs");
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }

        const dateString = getDate();
        const logFilePath = path.join(logDirectory, `results_${dateString}.md`); // Fixed template literals for filename

        fs.writeFileSync(logFilePath, results.join("")); // Write the results to file
    }

    if (useWebhook) {
        sendMessageToWebhook(webhookFields, getDate());
    }
};
