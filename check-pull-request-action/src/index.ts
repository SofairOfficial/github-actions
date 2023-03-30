import * as core from '@actions/core'
import * as github from '@actions/github'
import {GitHub} from '@actions/github/lib/utils'
import {parsePullMessage, parseCommitMessage} from './parse'

/**
 * Enters action's main loop
 */
async function run(): Promise<void> {
  try {
    // Load input parameters
    const githubToken = core.getInput('github-token', {required: true})
    const prNumber = core.getInput('pull-request-number')
    const octokit = github.getOctokit(githubToken)

    // Get pull request's title line and analyze its content
    const title = await getPullTitle(octokit, prNumber)
    const result = parsePullMessage(title)
    if (!result) {
      throw new Error(
        'The pull request subject is malformed. It must be of the form "Valid message starts with a capital and has a pull request reference like (#10)"'
      )
    }

    //Get the inner commit message and analyze them
    const commits = await getCommitMessage(octokit, prNumber)
    for (const x of commits) {
      if (!parseCommitMessage(x)) {
        throw new Error(
          'The commit message is malformed. It must be of the form "type(scope): explain the main goal"'
        )
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

// Function to the get the pull request's title
async function getPullTitle(
  octokit: InstanceType<typeof GitHub>,
  num: string
): Promise<string> {
  const {owner, repo, pull_number} = getContext(num)

  const response = await octokit.rest.pulls.get({owner, repo, pull_number})

  core.debug(`The PR title is ${response}`)

  return response.data.title
}

// Function to get the inner commits' message
async function getCommitMessage(
  octokit: InstanceType<typeof GitHub>,
  num: string
): Promise<string[]> {
  const {owner, repo, pull_number} = getContext(num)
  const commits = []

  const innerCommits = await octokit.rest.pulls.listCommits({
    owner,
    repo,
    pull_number
  })
  for (const x of innerCommits.data) {
    commits.push(x.commit.message)
  }

  core.debug(`${commits}`)

  return commits
}

// Function to get the pull request's number
function getPullNumber(num: string): number {
  return Number(num)
}

// Function to get the owner of the working repository
function getOwner(): string {
  return github.context.repo.owner
}

// Function to get the name of the working repository
function getRepo(): string {
  return github.context.repo.repo
}

// Function to get the context of the working repository : the owner and the name of the working
//repository and the pull request's number
function getContext(num: string): {
  owner: string
  repo: string
  pull_number: number
} {
  return {owner: getOwner(), repo: getRepo(), pull_number: getPullNumber(num)}
}

run()
