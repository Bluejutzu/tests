import fs from "fs";
import path from "path";

import { regexWebhook } from "../../discord/webhook/regexWebhook.js";
import { RegexTestConfig } from "../../types/types.js";
import { getDate, validateRegex } from "../utils.js";
import { data } from "./data.js";
import { testTerms } from "./terms.js";

const { defaultMatchers } = data;
let prevTerms: string[] = [];

export const runRegexTests = async (config: RegexTestConfig) => {
    const matchers = config.useDefaultMatchers ? defaultMatchers : config.userMatchers;

    if (!matchers) {
        console.error("No matchers provided and default matchers are not used.");
        return;
    }
    console.group("runRegexTests");
    console.log("Starting");
    const wordsToTest = config.testWords.length > 0 ? config.testWords : Object.values(testTerms).flat();

    const results: string[] = [];
    const webhookFields: any = [];

    const inputCount = wordsToTest.length;

    wordsToTest.forEach(term => {
        if (!prevTerms.includes(term)) {
            prevTerms.push(term);

            let output = `## Testing: ${term}\n`;
            let matcherResults = "";

            for (const [key, regexArray] of Object.entries(matchers)) {
                const matchResult = regexArray.some(matcher => validateRegex(term, matcher));
                matcherResults += `${matchResult ? "+ " : "- "}${key} Match: ${matchResult}\n`;
                output += `**${key}** Match: \`${matchResult}\`\n`;
            }

            output += "---\n";
            results.push(output);

            webhookFields.push({
                name: `Testing: ${term}`,
                value: `\`\`\`diff\n${matcherResults}\n\`\`\``,
                inline: false
            });
        } else {
            const index = prevTerms.findIndex(prevTerm => prevTerm === term);
            console.warn(
                `SKIPPED OPERATION: ${term} exists already, ${index === -1 ? null : `[${index}]: ${prevTerms[index]}`}`
            );
        }
    });
    prevTerms = [];

    results.push(`Total inputs tested: ${inputCount}`);

    webhookFields.push({
        name: "Total inputs tested",
        value: `${inputCount}`,
        inline: false
    });

    if (config.logToFile) {
        const logDirectory = path.join(import.meta.dirname!, "logs");
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }

        const dateString = getDate();
        const logFilePath = path.join(logDirectory, `results_${dateString}.md`);

        fs.writeFileSync(logFilePath, results.join(""));
    }

    if (config.useWebhook) {
        regexWebhook(webhookFields, getDate());
    }
    console.log("Ended");
    console.groupEnd();
};
