import { chain, Rule, Tree } from '@angular-devkit/schematics'
import { addLintFiles, Linter } from '@nrwl/workspace'

import { runInRule } from '@src/rules/run.rule'
import { Logger } from '@src/utils/logger/logger'

/**
 * @param  {Tree} host
 * @param  {Logger} log
 * @param  {T} options
 * @param  {{json:any} eslint
 * @param  {any}} deps
 * @returns Rule
 * Adding eslint to workspace
 */
export function addEslintToWorkspace<T extends { root: string }> (host: Tree, log: Logger, options: T, eslint: { json: any, deps: any }): Rule {
  return chain([
    !host.exists(`${options.root}/.eslintrc`) && !host.exists(`${options.root}/.eslintrc.json`)
      ? chain([
        runInRule(log.info.bind(log), 'Adding eslint configuration.'),

        addLintFiles(options.root, Linter.EsLint, {
          localConfig: eslint.json,
          extraPackageDeps: eslint.deps
        })
      ])
      : runInRule(log.warn.bind(log), 'Skipping since eslint configuration already exists.')
  ])
}
