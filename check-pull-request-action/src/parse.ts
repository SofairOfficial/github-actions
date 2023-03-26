/**
 * Parses the subject line of a pull request
 *
 * This function analyses messagesquash and merge commit combines several commits from a pull request's branch to the main branch, so
 * that to keep the git history lean and clean.
 * The expected format of a conventional squash and merge message is as follows:
 *
 *   'Modify the data model (#34)'
 *
 * Ehere '34' is the number of the pull request the input squash and commit message refers
 * to and that we want to extract.
 *
 * @param {String} The pull request's subject line.
 * @return {boolean} Return {true} if the pull request's subject line is well-formed or {false} otherwise.
 */
export function parse(subject: String): boolean {
    const regex = /^[A-Z].*\(\#(?<number>[0-9]+)\)$/;
    const matches = subject.toString().match(regex);

    return matches != null;
}