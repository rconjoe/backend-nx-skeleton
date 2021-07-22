import { apply, chain, externalSchematic, Rule, SchematicContext, url } from '@angular-devkit/schematics'
import { applyOverwriteWithDiff, convertStringToDirPath, createApplicationRule, CreateApplicationRuleInterface, deepMergeWithArrayOverwrite, Logger } from '@webundsoehne/nx-tools'
import { Schema as ExportsSchema } from '@webundsoehne/nx-tools/dist/schematics/exports/main.interface'
import { join } from 'path'

import { getSchematicFiles } from '../interfaces/file.constants'
import { NormalizedSchema } from '../main.interface'
import { AvailableDBAdapters } from '@src/interfaces'

export function createApplicationFiles (options: NormalizedSchema, context: SchematicContext): Rule {
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
    ),

    ...createApplicationRule({
      trigger: [
        {
          condition: options.dbAdapters.includes(AvailableDBAdapters.MONGOOSE),
          rule: externalSchematic<ExportsSchema>('@webundsoehne/nx-tools', 'exports', {
            silent: true,
            skipFormat: true,
            templates: {
              root: options.root,
              templates: [
                {
                  output: convertStringToDirPath(options.sourceRoot) + 'entity-mongoose/index.ts',
                  pattern: convertStringToDirPath(join(options.root, options.sourceRoot), { start: true, end: true }) + 'entity-mongoose/**/*.entity.ts'
                }
              ]
            }
          })
        },
        {
          condition: options.dbAdapters.includes(AvailableDBAdapters.TYPEORM),
          rule: externalSchematic<ExportsSchema>('@webundsoehne/nx-tools', 'exports', {
            silent: true,
            skipFormat: true,
            templates: {
              root: options.root,
              templates: [
                {
                  output: convertStringToDirPath(options.sourceRoot) + 'entity-typeorm/index.ts',
                  pattern: convertStringToDirPath(join(options.root, options.sourceRoot), { start: true, end: true }) + 'entity-typeorm/**/*.entity.ts'
                }
              ]
            }
          })
        }
      ]
    })

    // options.dbAdapters.includes(AvailableDBAdapters.MONGOOSE)
    //   ? externalSchematic<ExportsSchema>('@webundsoehne/nx-tools', 'exports', {
    //     silent: true,
    //     skipFormat: true,
    //     templates: {
    //       root: options.root,
    //       templates: [
    //         {
    //           output: convertStringToDirPath(options.sourceRoot) + 'entity-mongoose/index.ts',
    //           pattern: convertStringToDirPath(join(options.root, options.sourceRoot), { start: true, end: true }) + 'entity-mongoose/**/*.entity.ts'
    //         }
    //       ]
    //     }
    //   })
    //   : noop(),

    // options.dbAdapters.includes(AvailableDBAdapters.TYPEORM)
    //   ? externalSchematic<ExportsSchema>('@webundsoehne/nx-tools', 'exports', {
    //     silent: true,
    //     skipFormat: true,
    //     templates: {
    //       root: options.root,
    //       templates: [
    //         {
    //           output: convertStringToDirPath(options.sourceRoot) + 'entity-typeorm/index.ts',
    //           pattern: convertStringToDirPath(join(options.root, options.sourceRoot), { start: true, end: true }) + 'entity-typeorm/**/*.entity.ts'
    //         }
    //       ]
    //     }
    //   })
    //   : noop()
  ])
}

function generateRules (options: NormalizedSchema, log: Logger): Rule[] {
  log.debug('Generating rules for given options.')
  log.debug(JSON.stringify(options, null, 2))

  const template: CreateApplicationRuleInterface = {
    format: true,
    include: getSchematicFiles(options),
    templates: [
      // server related templates with __
      ...Object.values(AvailableDBAdapters).map((a) => ({
        condition: options?.dbAdapters.includes(a),
        match: a
      }))
    ]
  }

  return createApplicationRule(template, options)
}
