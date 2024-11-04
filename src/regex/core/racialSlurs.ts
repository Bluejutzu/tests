// deno-lint-ignore-file
import { sendMessageToWebhook } from "../../discord/webhook/sendToWebhook.ts";
import { data } from "./data.ts";
import { validateRegex } from "./validateRegex.ts";
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
    let webhookResults: { [key: string]: boolean } = {};

    wordsToTest.forEach(term => {
        let output = `## Testing: ${term}\n`;

        webhookResults = {}; // Reset for each word
        for (const [key, regexArray] of Object.entries(matchers)) {
            const matchResult = regexArray.some(matcher => validateRegex(term, matcher));
            webhookResults[key] = matchResult; // Collect for webhook
            output += `**${key}** Match: \`${matchResult}\`\n`;
        }

        output += `---\n`;
        results.push(output);

        console.log(output);
    });

    if (logToFile) {
        const logDirectory = path.join(import.meta.dirname!, "logs");
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }

        const now = new Date();
        const dateString = `${now.toISOString().slice(0, 10)}_${now.toTimeString().slice(0, 5).replace(":", "-")}`;
        const logFilePath = path.join(logDirectory, `results_${dateString}.md`);

        fs.writeFileSync(logFilePath, results.join(""));
    }

    if (useWebhook) {
        sendMessageToWebhook(webhookResults);
    }
};
