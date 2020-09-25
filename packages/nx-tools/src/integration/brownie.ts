import { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'
import merge from 'deepmerge'

import { BrownieIntegrationInterface } from './brownie.interface'

export function updateBrownieIntegration (name: string, options: BrownieIntegrationInterface): Rule {
  return updateJsonInTree('nx.json', (json) => {
    // write it back
    json.projects[name].brownie = merge(json.projects[name]?.brownie ?? {}, options, {
      arrayMerge: (target, source) => [ ...target, ...source ].filter((item, index, array) => array.indexOf(item) === index)
    })

    return json
  })
}
