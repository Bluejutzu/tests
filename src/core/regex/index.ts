import { runRegexTests } from "./runRegexTests";
import { terms } from "./terms";

runRegexTests({ testWords: terms, useDefaultMatchers: true, useWebhook: true });
