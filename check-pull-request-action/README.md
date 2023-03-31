# Check pull request format action

This GitHub Actions script (or action) aims at checking that a pull request is well-formed before being merged to the main branch of a repository.
This also aims to verify the message of the commits inside the pull-request (called inner-commits) is well formed for the semantic-
release tool.

It particularly targets repositories using the squash and merge commit strategy to keep their commit history clean and readable.

It also targets repositories using the [`semantic-release`](https://github.com/semantic-release/semantic-release) tool for automatically generating releases based on [conventional commits](https://github.com/conventional-commits-rs) standard. Here, only non-conventional (squash and merge) commits are expected in the main branch, each with a reference to the pull request it was squashed from, allowing to refer to the inner-commits, though the latter were [squashed](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits) during the merging of the pull request to the main branch. The format of such squash and merge commits is as follows:

```text
Modify the data model (#13)
```

where the block `(#13)`, and particularly the number `13`, is the index of the pull request containing the commits that were squashed and merged.

The format of inner-commit's message is as follows:

```text
type(scope): something changed
```

Where `type` is mandatory and picked from a list defined in the contributor's guide, `scope` is not mandatory and refers to the
scope the commit changed.

## Input parameters

The following input parameters

| Parameter      | Description                                     | Mandatory | Default |
| -------------- | ----------------------------------------------- | --------- | ------- |
| `github-token` | GitHub token for accessing GitHub repositories. | Yes       | None    |
| `pull-request-number` | GitHub pull request number to verify. | Yes | None |

## Output parameters

None

## Using the action in a workflow

The sample GitHub Actions workflow below shows how this action can be used as a step of a GitHub Actions worklflow:

```yaml
name: Verify pull request format
on:
  pull_request_target:
    types: [opened, synchronize]

jobs:
  check:
    name: Check pull request
    runs-on: ubuntu-latest

    steps:
      - name: Analyze pull request title
        uses: SofairOfficial/github-actions/check-pull-request-action@main
        with:
          pull-request-number: "${{ github.event.pull_request.number }}"
          github-token: "${{ secrets.GITHUB_TOKEN }}"
```

## Building the code

This GitHub Actions script is implemented using Typescript. The following command should be used to build it when modifying its code:

```bash
$ npm build
```

## Testing the code

Unit tests can be executed as follows:

```bash
$ npm test
```

## Testing the action

A way for testing the action locally is by executing the provided[test-check-pull-request-action](../.github/workflows/test-check-pull-request-action.yml) workflow using [Act](https://github.com/nektos/act) tool. For doing so, the following command should be executed at the root of this repository:

```bash
act -s GITHUB_TOKEN=[Your_Personal_Github_Token] pull_request_target
```

## References

- [Typescript Action boilerplate](https://github.com/actions/typescript-action)
- Hassan SANI. June 6th 2022. [Creating your own GitHub action with TypeScript](https://www.thisdot.co/blog/creating-your-own-github-action-with-typescript)
- https://github.com/ktrz/gh-action-js-marathon/blob/feat/setup-action/.github/workflows/test.yml
