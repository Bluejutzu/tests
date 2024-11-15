import { useRblxMessagingService } from "../hooks/useMessagingService.js";
const obj = {user: "bluejutzu", reason: "lmao"}
await useRblxMessagingService({ message: obj, topic: "announcement" });
await useRblxMessagingService({ message: "Hello world", topic: "announcement" });