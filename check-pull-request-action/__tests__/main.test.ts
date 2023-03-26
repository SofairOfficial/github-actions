import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

import {parse} from '../src/parse'

test('Pull request subject does not start with a capital letter', async () => {
  expect(parse("no capital letter (#10)")).toEqual(false)
})

test('Squash and merge commit with pull request reference', async () => {
  expect(parse("Commit with pull request reference as (#12)")).toEqual(true)
})

test('Squash and merge commit with pull request reference but not starting with a capital letter', async () => {
  expect(parse("commit with pull request reference as (#12)")).toEqual(false)
})
