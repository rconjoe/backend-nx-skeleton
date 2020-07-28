import { ConfigBaseCommand, promptUser, createTable, ConfigRemove, ConfigTypes } from '@cenk1cenk2/boilerplate-oclif'

import { WorkspaceConfig, WorkspacePrompt } from '@context/config/workspace.config.interface'

export class WorkspaceConfigCommand extends ConfigBaseCommand {
  static description = 'Edit available workspace skeletons through a user interface.'
  protected configName = 'workspace.config.yml'
  protected configType = ConfigTypes.general

  async configAdd (config: WorkspaceConfig): Promise<WorkspaceConfig> {
    // prompt user for details
    const response = await this.prompt(config)

    // userInput user if name already exists
    let overwritePrompt = true
    if (config?.[response?.name]) {
      overwritePrompt = await promptUser({ type: 'Toggle', message: `"${response?.name}" already exists in local configuration. Do you want to overwrite?` })
    }

    if (overwritePrompt) {
      config[response?.name] = response.value
      this.logger.success(`Added "${response.name}" to the local configuration.`)
    }

    return config
  }

  async configEdit (config: WorkspaceConfig): Promise<WorkspaceConfig> {
    // prompt user for which keys to edit
    const select = await promptUser({
      type: 'Select',
      message: 'Please select configuration to edit.',
      choices: Object.keys(config)
    })

    const edit = await this.prompt(config, select)

    // strip old item
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const { [select]: omit, ...rest } = config

    // write to temp
    rest[edit.name] = edit.value
    this.logger.success(`Edited "${select}" with "${edit.name}@${edit.value}" in the local configuration.`)

    return rest
  }

  async configShow (config: WorkspaceConfig): Promise<void> {
    if (Object.keys(config).length > 0) {
      this.logger.info(createTable([ 'Name', 'Repository' ], Object.entries(config)))
    } else {
      this.logger.warn('Configuration file is empty.')
    }

    this.logger.module('Configuration file is listed.')
  }

  async configRemove (config: WorkspaceConfig): Promise<ConfigRemove<WorkspaceConfig>> {
    return {
      keys: Object.keys(config),
      removeFunction: async (config, userInput): Promise<WorkspaceConfig> => {
        userInput.forEach((input) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [input]: omit, ...rest } = config
          config = rest
        })

        return config
      }
    }
  }

  protected validate (value): boolean | string {
    if (value.value === '') {
      return 'Repository field can not be left empty.'
    }
    return true
  }

  protected result (value): { name: string, value: string } {
    if (value.name === '') {
      value.name = value.value?.split('/').pop()
      this.logger.warn(`Name was empty for "${value.value}", initiated it as "${value.name}".`)
    }
    return value
  }

  private prompt (config: WorkspaceConfig, select?: string): Promise<WorkspacePrompt> {
    return promptUser<WorkspacePrompt>({
      type: 'Form',
      message: 'Please provide the details for repository below.',
      choices: [
        {
          name: 'value',
          message: 'Repository',
          initial: select ?? config[select]
        },
        {
          name: 'name',
          message: 'Name',
          initial: select ?? select
        }
      ],
      validate: (value) => this.validate(value),
      result: (value) => this.result(value)
    })
  }
}
