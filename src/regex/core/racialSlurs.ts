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

    const wordsToTest = testWords && testWords.length > 0 ? testWords : Object.values(data.testTerms).flat();

    let results: string[] = [];

    wordsToTest.forEach(term => {
        let output = `### Testing: **${term}**\n`;

        for (const [key, regexArray] of Object.entries(matchers)) {
            const matchResult = regexArray.some(matcher => validateRegex(term, matcher));
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
        const dateString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now
            .getDate()
            .toString()
            .padStart(2, "0")}_${now.getHours().toString().padStart(2, "0")}-${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
        const logFilePath = path.join(logDirectory, `results_${dateString}.md`);

        fs.writeFileSync(logFilePath, results.join(""));
    }
    if (useWebhook) {
        sendMessageToWebhook(results)
    }
};

// Usage example:
// logResults(true, true); // To use default matchers and log to file
// logResults(false, true, { customMatchers: [/* user-defined regexes */] }, ["your", "custom", "words"]); // Use user-defined matchers and custom words
