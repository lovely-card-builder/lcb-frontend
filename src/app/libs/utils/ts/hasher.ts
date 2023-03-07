import {Message, sha512} from "js-sha512";

export function generateHashFor(value: Message) {
  return sha512(value);
}
