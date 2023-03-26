import * as core from '@actions/core'
import {context} from '@actions/github'
import {parse} from './parse'

type GithubContext = typeof context



/**
 * Enters action's main loop
 */
async function run(): Promise<void> {
  try {
    // Load input parameters
    const githubToken = core.getInput('github-token')

    // Get pull request's subject line and analyze its contents
    const body = context.payload.pull_request?.body;
    if (body !== undefined) {
      core.debug(`PR body is: ${body}`)
      const result = parse("Modify sample data model (#13)")
      core.debug(`Parsing result: ${result}`)
    } else {
      throw new Error('The pull request subject is malformed. It must be of the form "Valid message starts with a capital and has a pull request reference like (#10)"')
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
