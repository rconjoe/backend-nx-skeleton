import { BrownieAvailableContainers } from '@webundsoehne/nx-tools'

import { DockerHelperCtx } from '@helpers/docker.helper.interface'
import { DockerHelperLock } from '@interfaces/lock-file.interface'

export interface DockerContainerAddCtx extends DockerHelperCtx {
  prompt: BrownieAvailableContainers[]
}

export class DockerContainersPurgeCtx {
  prompt: {
    containers?: BrownieAvailableContainers[]
    purge?: DockerHelperLock[]
  }

  constructor () {
    this.prompt = {}
    this.prompt.containers = []
    this.prompt.purge = []
  }
}
