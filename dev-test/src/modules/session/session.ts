/*
I moved the Map to a separate file, since we use it in several places and
if we leave initialization at the class level,
the Map will be recreated together with the instance of the class
 */
export const sessions = new Map<string, string>();
