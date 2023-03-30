/**
 * Parses the subject line of a pull request
 *
 * This function analyses message of a squash and merge commit that combines several commits from a pull request's branch to the main branch, so
 * that to keep the git history lean and clean.
 * The expected format of a conventional squash and merge message is as follows:
 *
 *   'Modify the data model (#34)'
 *
 * Here '34' is the number of the pull request the input squash and commit message refers
 * to and that we want to extract.
 *
 * @param {String} subject The pull request's subject line.
 * @return {boolean} Return {true} if the pull request's subject line is well-formed or {false} otherwise.
 */
export function parsePullMessage(subject: String): boolean {
  const regex = /^[A-Z].*\(#(?<number>[0-9]+)\)$/
  const matches = subject.toString().match(regex)

  return matches != null
}

/**
 * Parses the message of a commit
 *
 * This function analyses message of a commit
 * The expected format of a conventional commit is as follows:
 *
 *   'type(scope): message'
 *   'feat: add inner commit analyzer'
 *
 * The type is mandatory and they are defined in the [contributor's bible](https://github.com/SofairOfficial/rust-project-template/blob/main/CONTRIBUTOR_BIBLE.md) :
 * [break | build | ci | docs | feat | fix | perf | refac | sec | style | test]
 * The scope is optionnal, the message begins by a minuscule and doesn't end with a point
 *
 * @param {String} message The commit's message.
 * @return {boolean} Return {true} if the commit's message is well-formed or {false} otherwise.
 */
export function parseCommitMessage(message: String): boolean {
  const regex =
    /^(break|build|ci|docs|feat|fix|perf|refac|sec|style|test){1}(?<scope>\(\S.*\S\))?:\s.*[a-z]$/
  const matches = message.toString().match(regex)

  return matches != null
}
