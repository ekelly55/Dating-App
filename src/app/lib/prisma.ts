import { PrismaClient } from "@prisma/client";

//This line creates a variable globalForPrisma that is typed as an object with a prisma property of type PrismaClient. This allows us to store the Prisma Client instance globally, ensuring that it persists across module reloads.

//The global Object:
//In Node.js, global is the global object, similar to window in browsers. It allows you to define variables that are accessible globally within the Node.js environment.

//This part of the code is asserting the type of global to unknown. This is a way to reset the type system so that the next assertion can be applied. By default, global in Node.js has the type NodeJS.Global, but this type does not have a prisma property. By casting it to unknown, we tell TypeScript to forget the current type of global.

//After casting global to unknown, we then cast it to an object type { prisma: PrismaClient }. This tells TypeScript that we are treating global as an object that contains a prisma property of type PrismaClient.

/**TypeScript Compatibility: The global object does not natively include a prisma property in its type definition. Directly asserting global as { prisma: PrismaClient } would cause a type error because TypeScript knows that global does not have this property by default.
Safety: The unknown type is a type-safe way to cast from one type to another in multiple steps. The first step (as unknown) effectively tells TypeScript to forget the original type of global. The second step (as { prisma: PrismaClient }) redefines the type of global to include our custom prisma property. */

//so basically, we need to copy and change the properties of the global object, but can't do that b/c of type safety. we can change the type by casting it to type: unknown. then we immediately follow that by casting it again to a new type of object that contains the property prisma of type prismaclient
const globalForPrisma = global as unknown as {prisma: PrismaClient};

//Here, we check if globalForPrisma.prisma already has a Prisma Client instance:

// If it does, we use the existing instance (globalForPrisma.prisma).
// If it doesn't, we create a new instance of PrismaClient with logging enabled for queries and assign it to prisma.
//here we're declaring a variable prisma, which is defined as the value of the key prisma from our globalforPrisma, if it exists (if it does, then there's an existing prisma client). if not, we're going to create an instance of prisma client
export const prisma = globalForPrisma.prisma || new PrismaClient({log: ['query']})

// If environment is not production (i.e., it's development), we assign the prisma instance to globalForPrisma.prisma. This ensures that the same instance of Prisma Client is reused across hot reloads.
//we declared prisma above: it's either the existing prismaclient or an initial instance of it. if we're in dev env, then we want the global object to use the existing prisma client instance as its prisma property
if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma= prisma;