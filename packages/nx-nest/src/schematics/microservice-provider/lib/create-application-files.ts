import { apply, chain, Rule, SchematicContext, url } from '@angular-devkit/schematics'
import { applyOverwriteWithDiff, createApplicationRule, CreateApplicationRuleInterface, Logger, deepMergeWithArrayOverwrite } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '../main.interface'

export async function createApplicationFiles (options: NormalizedSchema, context: SchematicContext): Promise<Rule> {
  const log = new Logger(context)
  // source is always the same
  const source = url('./files')

  return chain([
    applyOverwriteWithDiff(
      // just needs the url the rest it will do it itself
      apply(source, generateRules(options, log)),
      // needs the rule applied files, representing the prior configuration
      options?.priorConfiguration ? apply(source, generateRules(deepMergeWithArrayOverwrite<NormalizedSchema>(options, options.priorConfiguration), log)) : null,
      context
    )
  ])
}

function generateRules (options: NormalizedSchema, log: Logger): Rule[] {
  log.debug('Generating rules for given options.')
  log.debug(JSON.stringify(options, null, 2))

  const template: CreateApplicationRuleInterface = {
    templates: []
    // multipleTemplates: [
    //   ...options.parsedMicroservices.map((microservice) => ({
    //     path: 'src/interfaces/__default__.interface.ts.j2',
    //     output: `${options.root}/src/interfaces/${microservice.casing.kebab}/default.interface.ts`,
    //     factory: (ctx: NormalizedSchema): Record<string, any> => {
    //       return {
    //         ...ctx.parsedMicroservices
    //       }
    //     }
    //   }))
    // ]
  }

  return createApplicationRule(template, options)
}
