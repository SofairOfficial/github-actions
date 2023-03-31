import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

import {parsePullMessage, parseCommitMessage} from '../src/parse'

test('Pull request subject does not start with a capital letter', async () => {
  expect(parsePullMessage('no capital letter (#10)')).toEqual(false)
})

test('Squash and merge commit with pull request reference', async () => {
  expect(
    parsePullMessage('Commit with pull request reference as (#12)')
  ).toEqual(true)
})

test('Squash and merge commit with pull request reference but not starting with a capital letter', async () => {
  expect(
    parsePullMessage('commit with pull request reference as (#12)')
  ).toEqual(false)
})

test("Wrong commit's message doesn't begin by a defined type", async () => {
  expect(parseCommitMessage('add: some addendum')).toEqual(false)
})

test("Wrong commit's message finishes by a space", async () => {
  expect(parseCommitMessage('break(scope): add a breakin change ')).toEqual(
    false
  )
})

test("Wrong commit's message doesn't finish by a minuscule letter", async () => {
  expect(parseCommitMessage('break(scope): add a breakin change.')).toEqual(
    false
  )
})

test("Commit's message finishes by a number is well formed", async () => {
  expect(parseCommitMessage('refac: add something 3')).toEqual(true)
})

test("Commit's message is well formed with a scope", async () => {
  expect(parseCommitMessage('feat(scope): add something')).toEqual(true)
})

test("Commit's message is well formed without a scope", async () => {
  expect(parseCommitMessage('refac: add something')).toEqual(true)
})

test("Wrong commit's message contains a forbiden white space before the :", async () => {
  expect(parseCommitMessage('feat(scope) : add something')).toEqual(false)
})
