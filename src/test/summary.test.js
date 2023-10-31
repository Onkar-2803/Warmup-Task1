/**
 * @jest-environment jsdom
 */
'use strict';
import { expect, jest, describe, it, beforeEach, afterEach, beforeAll } from "@jest/globals";

import { test_html } from "./helper";

jest.useFakeTimers();

let summary;

describe('toggleSummary', () => {
    beforeAll(async () => {
        Object.defineProperty(window, 'requestAnimationFrame', {
            writable: true,
            value: cb => cb()
        });
        summary = await import('../summary');
    });
    beforeEach(() => {
        document.body.innerHTML = test_html;
    });
    it('prevents default', () => {
        const girl = document.querySelector('#t-girl-toggle');
        const mock_evt = {target: girl, preventDefault: jest.fn()};
        summary.toggleSummary(mock_evt);
        expect(mock_evt.preventDefault).toBeCalled();
    });
    it('opens and closes inline', () => {
        const girl = document.querySelector('#t-girl-toggle');
        const mock_evt = {target: girl, preventDefault: jest.fn()};
        summary.toggleSummary(mock_evt);
        expect(document.querySelector('#t-girl-detail').style.display).toBe('inline');
        jest.runAllTimers();
        summary.toggleSummary(mock_evt);
        expect(document.querySelector('#t-girl-detail').style.display).toBe('none');
    });
    it('opens and closes block', () => {
        const warm = document.querySelector('#t-warm-toggle');
        const mock_evt = {target: warm, preventDefault: jest.fn()};
        summary.toggleSummary(mock_evt);
        expect(document.querySelector('#global-warming-details').style.display).toBe('block');
        jest.runAllTimers();
        summary.toggleSummary(mock_evt);
        expect(document.querySelector('#global-warming-details').style.display).toBe('none');
    });
});
