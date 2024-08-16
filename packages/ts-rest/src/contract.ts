import { initContract } from "@ts-rest/core";
import { todoContract } from "./routes/todoContract";

const c = initContract();

export const APIContract = c.router({
  Todo: todoContract.routes,
});
