import { GeneratedNameCases } from '@webundsoehne/nx-tools'

import { GeneratedMicroserviceCasing } from './../../utils/generate-microservice-casing.interface'
import {
  AvailableComponents,
  AvailableDBTypes,
  AvailableServerTypes,
  AvailableTestsTypes,
  AvailableLinterTypes,
  AvailableMicroserviceTypes,
  AvailableDBAdapters
} from '@interfaces/available.constants'
import { SchematicConstants } from '@interfaces/constants'

/**
 * This is the unparsed options list coming from angular-schematics
 */
export interface Schema extends CommonPropertiesToSaveAndUse<true> {
  name: string
  // options for schematic
  directory: string
  linter: AvailableLinterTypes
  // injected options
  skipFormat: boolean
}

/**
 * This is the parsed options after normalizing options.
 * It can not extend the default schema because types are different after parsed
 */
export interface NormalizedSchema extends Schema {
  name: string
  // parsed internally
  packageName: string
  packageScope: string
  root: string
  sourceRoot: string
  casing: GeneratedNameCases
  injectedCasing?: { microservice?: GeneratedMicroserviceCasing }
  microserviceCasing?: Record<string, GeneratedMicroserviceCasing>
  constants: typeof SchematicConstants
  // prior configuration will be written to nx.json for further processing
  priorConfiguration: CommonPropertiesToSaveAndUse<true>
  // injecting enums since i want to compare this in jinja templates
  enum: Omit<CommonPropertiesToSaveAndUse<false>, 'microserviceClient' | 'effectiveComponents'> & Record<'dbAdapters', typeof AvailableDBAdapters>
}

interface CommonPropertiesToSaveAndUse<Values extends boolean = false> {
  components: Values extends true ? AvailableComponents[] : typeof AvailableComponents
  effectiveComponents: number
  server: Values extends true ? AvailableServerTypes : typeof AvailableServerTypes
  microservice: Values extends true ? AvailableMicroserviceTypes : typeof AvailableMicroserviceTypes
  microserviceClient: string[]
  database: Values extends true ? AvailableDBTypes : typeof AvailableDBTypes
  tests: Values extends true ? AvailableTestsTypes : typeof AvailableTestsTypes
}
