import { runRegexTests } from "../regex/core/runRegexTests.js";
import { terms } from "../regex/offensive_terms/terms.js";

runRegexTests({ testWords: terms, useDefaultMatchers: true, useWebhook: true });
