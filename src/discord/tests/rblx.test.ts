import { useRblxMessagingService } from "../hooks/useMessagingService.js";
const obj = { user: "bluejutzu", reason: "lmao" };

Promise.all([
    useRblxMessagingService({ message: obj, topic: "announcement" }),
    useRblxMessagingService({ message: "Hello world", topic: "announcement" })
]).catch(v => console.error(new Error(v)));
