import test from 'node:test';
import assert from 'node:assert/strict';
import { isAppsScriptBase, normalizeApiBase } from './apiBase';

const ID = 'AKfycbxAbC123_-xyz';
const exec = `https://script.google.com/macros/s/${ID}/exec`;

test('a clean Web App link is kept as is', () => {
  assert.equal(normalizeApiBase(exec), exec);
  assert.equal(normalizeApiBase(` ${exec}/ `), exec);
});

test('a messy pasted link is repaired instead of failing', () => {
  const messy = [
    `"${exec}"`,
    `<${exec}>`,
    `${exec}?authuser=0`,
    `این لینک را بگذار: ${exec}`,
    `[لینک](${exec})`,
    `https://script.google.com/macros/s/${ID}/exec/`
  ];
  messy.forEach((value) => assert.equal(normalizeApiBase(value), exec, value));
});

test('a /dev link is rejected with a helpful message', () => {
  assert.throws(() => normalizeApiBase(`https://script.google.com/macros/s/${ID}/dev`), /\/dev/);
});

test('only a deployed Apps Script link is treated as Google mode', () => {
  assert.equal(isAppsScriptBase(exec), true);
  assert.equal(isAppsScriptBase(`${exec}?x=1`), true);
  assert.equal(isAppsScriptBase(`https://script.google.com/macros/s/${ID}/dev`), false);
  assert.equal(isAppsScriptBase('https://members.example.com'), false);
  assert.equal(isAppsScriptBase('http://localhost:3001'), false);
  assert.equal(isAppsScriptBase(''), false);
});

test('an https server address works and plain http is rejected away from localhost', () => {
  assert.equal(normalizeApiBase('https://members.example.com/'), 'https://members.example.com');
  assert.equal(normalizeApiBase('https://members.example.com/api/?x=1'), 'https://members.example.com/api');
  assert.equal(normalizeApiBase('http://localhost:3001'), 'http://localhost:3001');
  assert.equal(normalizeApiBase('members.example.com'), 'https://members.example.com');
  assert.throws(() => normalizeApiBase('http://members.example.com'), /https/);
  assert.equal(normalizeApiBase('   '), '');
});

test('a Google Sheet link is named for what it is instead of a network error', () => {
  assert.throws(() => normalizeApiBase('https://docs.google.com/spreadsheets/d/abc123/edit'), /Google Sheet/);
});

test('a link pasted without https:// is still understood', () => {
  assert.equal(normalizeApiBase(`script.google.com/macros/s/${ID}/exec`), exec);
});
