import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'

import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { Schema } from './main.interface'
import { formatOrSkip, runInRule } from '@src/rules'
import { Logger } from '@utils'

/**
 * @param  {Schema} schema
 * The schematic itself.
 */
export function generateGenericGenerator (files: string) {
  return function (schema: Schema): (host: Tree, context: SchematicContext) => Promise<Rule> {
    return async (host: Tree, context: SchematicContext): Promise<Rule> => {
      const log = new Logger(context)
      const options = await normalizeOptions(files, host, context, schema)

      return chain([
        runInRule(log.info.bind(log)(`Generating "${options.type}" files: ${options.name}@${options.root}`), !schema.silent),
        createApplicationFiles(files, options, context),

        formatOrSkip(log, schema.skipFormat, { eslint: true, prettier: true })
      ])
    }
  }
}