import { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'
import merge from 'deepmerge'

import { NxJsonIntegration } from './nx-json.interface'

export function updateNxIntegration (name: string, options: NxJsonIntegration): Rule {
  return updateJsonInTree('nx.json', (json) => {
    let nxJson = {} as NxJsonIntegration

    // get the current config or create a new one
    if (!json?.projects?.[name]?.integration) {
      json.projects[name].integration = {} as NxJsonIntegration
    } else {
      nxJson = json.projects[name].integration
    }

    // write it back
    json.projects[name].integration = merge(nxJson, options)

    return json
  })
}
