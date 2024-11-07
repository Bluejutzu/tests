import { logResults } from "../core/racialSlurs.ts"; 
import { terms } from "../offensive_terms/terms.ts"; 

Deno.bench({
    baseline: true,
    name: "LogResults",
    fn: () => {
        logResults(terms, true, false, true);
    }
});
