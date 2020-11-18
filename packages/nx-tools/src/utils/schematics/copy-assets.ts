import glob from 'glob'
import { join } from 'path'

import { AssetGlob, FileInputOutput } from '@interfaces/assets.interface'
import { removePathRoot } from '@utils'

export function generateBuilderAssets (options: { workspaceRoot: string, outDir: string, cwd?: string }, assets: (AssetGlob | string)[]): FileInputOutput[] {
  const files: FileInputOutput[] = []

  // globbing some files
  const globbedFiles = (pattern: string, input = '', ignore: string[] = []): string[] => {
    return glob.sync(pattern, {
      cwd: input,
      nodir: true,
      ignore
    })
  }

  // normalize assets
  assets.forEach((asset) => {
    if (typeof asset === 'string') {
      files.push({
        input: join(options.workspaceRoot, asset),
        output: options.cwd ? join(options.workspaceRoot, options.outDir, removePathRoot(asset, options.cwd)) : asset
      })
    } else {
      globbedFiles(asset.glob, join(options.workspaceRoot, asset.input), asset.ignore).forEach((globbedFile) => {
        files.push({
          input: join(options.workspaceRoot, asset.input, globbedFile),
          output: join(options.workspaceRoot, options.outDir, asset.output, globbedFile)
        })
      })
    }
  })

  return files
}
