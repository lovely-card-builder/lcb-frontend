import {v4 as uuidv4} from 'uuid';

export function generateRandId(): string {
  return uuidv4().toString();
}
