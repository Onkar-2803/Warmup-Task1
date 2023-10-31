/**
 * @jest-environment jsdom
 */
'use strict';
import { getSummaries } from "../summary";
import { loaded } from "../loaded";
import { expect, jest, describe, it, beforeAll } from "@jest/globals";

import { test_html } from "./helper";

jest.useFakeTimers();

describe('getSummaries', ()=> {
    it ('is empty on empty page', () => {
        expect(getSummaries()).toHaveLength(0);
    });
    it ('works on test page', () => {
        document.body.innerHTML = test_html;
        expect(getSummaries()).toHaveLength(5);
    });
});

describe('process events', () => {
    beforeAll(() => {
        document.body.innerHTML = test_html;
        loaded();
    });
    it('process mouse events', () => {
        const girl = document.querySelector('#t-girl-toggle');
        girl.dispatchEvent(new TouchEvent('touchstart'));
        jest.runAllTimers();
        expect(document.querySelector('#t-girl-detail').style.display).toBe('inline');
    });
    it('process touch events', () => {
        const girl = document.querySelector('#t-girl-toggle');
        girl.classList.toggle('stretchtext-open');
        girl.dispatchEvent(new TouchEvent('touchstart'));
        jest.runAllTimers();
        expect(document.querySelector('#t-girl-detail').style.display).toBe('none');
    });
});

describe('app', () => {
    beforeAll(async () => {
        document.body.innerHTML = test_html;
        await import('../app');
    });
    it('duplicates the document', () => {
        document.dispatchEvent(new Event("DOMContentLoaded"));
        expect(getSummaries()).toHaveLength(10);
    });
    it('updates the attributes', () => {
        const parent = document.querySelector('.parent aside');
        const child = document.querySelector('.child aside');
        expect(child.id).toBe(parent.id + '3');
    });
})
