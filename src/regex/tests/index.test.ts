import { logResults } from "../core/logResults.ts";
import { data } from "../core/data.ts";
import { terms } from "../offensive_terms/terms.ts";
import { getDate, validateRegex } from "../../lib/utils.ts";

//TODO: Change data.testTerms due to offensive_terms/terms.ts (which is more favorable) ~= core/data.ts {testTerms}
const wordsToTest = terms.length > 0 ? terms : Object.values(data.testTerms).flat();
const defaultMatchers = data.defaultMatchers;

function sumUsingForEeach(arr: string[]) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += i;
    }
    return sum;
}

Deno.bench({
    name: "LogResults",
    fn: () => {
        logResults(terms, true, false, true);
    }
});

Deno.bench({
    name: "getDate",
    fn: () => {
        getDate();
    }
});

Deno.bench({
    name: "validateRegex",
    fn: () => {
        wordsToTest.forEach(v => {
            for (const [_, regexArray] of Object.entries(defaultMatchers!)) {
                regexArray.some(matcher => validateRegex(v, matcher, false));
            }
        });
    }
});

Deno.bench({
    name: "loopThroughTerms",
    fn: () => {
        sumUsingForEeach(terms);
    }
});
