// deno-lint-ignore-file

import fs from "node:fs";
import path from "node:path";
import { data } from "./data.js";
import { getDate, validateRegex } from "@/lib/utils.js";
import { regexWebhook } from "@/discord/webhook/regexWebhook.js";

const defaultMatchers = data.defaultMatchers;
let prevTerms: string[] = [];

//TODO: rename this to something better cause it sounds ass
export const logResults = async (
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

            output += `---\n`;
            results.push(output);

            webhookFields.push({
                name: `Testing: ${term}`,
                value: `\`\`\`diff\n${matcherResults}\n\`\`\``,
                inline: false
            });
        } else {
            // const index = prevTerms.findIndex(prevTerm => prevTerm === term);
            // console.warn(
            //     `SKIPPED OPERATION: ${term} exists already, ${index === -1 ? null : `[${index}]: ${prevTerms[index]}`}`
            // );
        }
    });
    prevTerms = [];

    results.push(`Total inputs tested: ${inputCount}`);

    webhookFields.push({
        name: "Total inputs tested",
        value: `${inputCount}`,
        inline: false
    });

    if (logToFile) {
        const logDirectory = path.join(import.meta.dirname!, "logs");
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }

        const dateString = getDate();
        const logFilePath = path.join(logDirectory, `results_${dateString}.md`);

        fs.writeFileSync(logFilePath, results.join(""));
    }

    if (useWebhook) {
        regexWebhook(webhookFields, getDate());
    }
};
