import { Linter } from '@nrwl/workspace'

/**
 * All the available components that can be generated by this schematic.
 */
export enum AvailableComponents {
  SERVER = 'server',
  COMMAND = 'command',
  BG_TASK = 'bgtask',
  MICROSERVICE_CLIENT = 'microservice-client',
  MICROSERVICE_SERVER = 'microservice-server'
}

/**
 * If server component is selected, these are the options to serve as a server.
 */
export enum AvailableServerTypes {
  RESTFUL = 'restful',
  GRAPHQL = 'graphql'
}

/**
 * Database can be selected for various parts of the application.
 * This is the database available that can be automatically injected.
 */
export enum AvailableDBTypes {
  NONE = 'none',
  TYPEORM_MYSQL = 'typeorm-mysql',
  TYPEORM_POSTGRESQL = 'typeorm-postgresql',
  MONGOOSE_MONGODB = 'mongoose-mongodb'
}

/**
 * Database adapters, these are not selectable but used in internal scripts.
 */
export enum AvailableDBAdapters {
  TYPEORM = 'typeorm',
  MONGOOSE = 'mongoose'
}

/**
 * Available test configurations.
 */
export enum AvailableTestsTypes {
  NONE = 'none',
  JEST = 'jest'
}

/**
 * Available microservice types after selecting microservice-server as component.
 */
export enum AvailableMicroserviceTypes {
  RMQ = 'rmq'
}

/**
 * Available Linters
 */
export type AvailableLinterTypes = Exclude<Linter, 'tslint'>

/**
 * Available extensions to further customize the application.
 */
export enum AvailableExtensions {
  EXTERNAL_BACKEND_INTERFACES = 'external-backend-interfaces'
}

/**
 * Available through generating through the generator.
 * Just typing it so that it can be called as an external schematic.
 * It does not directly use these types since it globs the directory.
 */
export enum AvailableGenerators {
  MONGOOSE_ENTITY = 'mongoose-entity',
  MONGOOSE_ENTITY_TIMESTAMPS = 'mongoose-entity-timestamps',
  TYPEORM_ENTITY = 'typeorm-entity',
  TYPEORM_ENTITY_PRIMARY = 'typeorm-entity-with-primary'
}

/**
 * Prettified names for components to use with prompts and such.
 */
export const PrettyNamesForAvailableThingies: Record<
AvailableComponents | AvailableServerTypes | AvailableDBTypes | AvailableTestsTypes | AvailableMicroserviceTypes | AvailableExtensions,
string
> = {
  [AvailableComponents.SERVER]: 'Server',
  [AvailableComponents.COMMAND]: 'Command',
  [AvailableComponents.BG_TASK]: 'Scheduler',
  [AvailableComponents.MICROSERVICE_CLIENT]: 'Microservice Client',
  [AvailableComponents.MICROSERVICE_SERVER]: 'Microservice Server',
  [AvailableServerTypes.GRAPHQL]: 'GraphQL Server',
  [AvailableServerTypes.RESTFUL]: 'Restful Server',
  [AvailableDBTypes.NONE]: 'None',
  [AvailableDBTypes.TYPEORM_MYSQL]: 'MySQL with TypeORM',
  [AvailableDBTypes.TYPEORM_POSTGRESQL]: 'PostgreSQL with TypeORM',
  [AvailableDBTypes.MONGOOSE_MONGODB]: 'MongoDB with Mongoose',
  [AvailableTestsTypes.JEST]: 'Jest',
  [AvailableTestsTypes.NONE]: 'None',
  [AvailableMicroserviceTypes.RMQ]: 'RabbitMQ',
  [AvailableExtensions.EXTERNAL_BACKEND_INTERFACES]: 'Use external backend interfaces library'
}
