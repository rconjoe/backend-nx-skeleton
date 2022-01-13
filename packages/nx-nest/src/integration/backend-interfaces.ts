import { BackendInterfacesIntegration } from './backend-interfaces.interface'
import { NxNestProjectIntegration } from './integration.interface'
import { readWorkspaceJson } from '@webundsoehne/nx-tools'

/**
 * Reads the backend interface integration part of the nx.json.
 */
export function readBackendInterfaceIntegration (): BackendInterfacesIntegration[] {
  const workspaceJson = readWorkspaceJson<NxNestProjectIntegration>()

  return Object.entries(workspaceJson.projects).reduce((o, [ key, value ]) => {
    if (value.integration?.backendInterfaces?.dbAdapters) {
      o = [
        ...o,
        {
          name: key,
          root: value.root,
          sourceRoot: value.sourceRoot,
          dbAdapters: value.integration.backendInterfaces.dbAdapters
        }
      ]
    }

    return o
  }, [])
}
