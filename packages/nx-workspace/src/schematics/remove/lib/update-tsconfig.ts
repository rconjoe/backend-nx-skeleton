import { Tree } from '@angular-devkit/schematics'
import { getWorkspace, NxJson, readJsonInTree, serializeJson } from '@nrwl/workspace'
import { NxConstants } from '@webundsoehne/nx-tools'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Schema } from '../main.interface'

/**
 * Updates the tsconfig paths to remove the project.
 *
 * @param schema The options provided to the schematic
 */
export function updateTsconfig (schema: Schema) {
  return (tree: Tree): Observable<Tree> => {
    return from(getWorkspace(tree)).pipe(
      map((workspace) => {
        const nxJson = readJsonInTree<NxJson>(tree, 'nx.json')
        const project = workspace.projects.get(schema.projectName)

        const tsConfigPath = NxConstants.TS_CONFIG_PATH

        if (tree.exists(tsConfigPath)) {
          const tsConfigJson = readJsonInTree(tree, tsConfigPath)
          delete tsConfigJson.compilerOptions.paths[`@${nxJson.npmScope}/${project.root.substr(5)}`]
          tree.overwrite(tsConfigPath, serializeJson(tsConfigJson))
        }

        return tree
      })
    )
  }
}
