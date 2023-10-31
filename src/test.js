/**
 * @jest-environment jsdom
 */
'use strict';
import { getSummaries, toggleSummary } from "./summary";
import { loaded } from "./loaded";
import { expect, jest, describe, it, beforeEach, afterEach, beforeAll } from "@jest/globals";

const test_html = `<body>
<div class="parent">
    <h1>Using epub-type</h1>
    <p>There once was a <span epub-type="stretchsummary" id="t-girl-toggle">girl</span><span id="t-girl-detail" epub-type="stretchdetail"> Her name was <span epub-type="stretchsummary">Nancy</span><span epub-type="stretchdetail">That was my mother's name.</span> Some stuff at the end</span></p>
    <p>Most scientists accept <a href="#global-warming-details" epub-type="stretchsummary" id="t-warm-toggle">global warming</a>.</p>
    <aside id="global-warming-details" epub-type="stretchdetail">
        <p>More details on global warming. <a epub-type="stretchsummary" href="#evenmore">More supporting evidence</a></p>
        <ol id="evenmore" epub-type="stretchdetail">
            <li>Greater degrees of CO<sub>2</sub></li>
            <li>Evidence of warming <span epub-type="stretchsummary">trend</span><span epub-type="stretchdetail"> It's the truth -- accept it!</span>.</li>
        </ol>
    </aside>
    <p>This is material at the bottom of the page that will get stretched down.</p>
</div>
<div class="child"></div>
</body>`;

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

describe('toggleSummary', () => {
    beforeEach(() => {
        document.body.innerHTML = test_html;
    });
    it('prevents default', () => {
        const girl = document.querySelector('#t-girl-toggle');
        const mock_evt = {target: girl, preventDefault: jest.fn()};
        toggleSummary(mock_evt);
        expect(mock_evt.preventDefault).toBeCalled();
    });
    it('opens inline', () => {
        const girl = document.querySelector('#t-girl-toggle');
        const mock_evt = {target: girl, preventDefault: jest.fn()};
        toggleSummary(mock_evt);
        expect(document.querySelector('#t-girl-detail').style.display).toBe('inline');
    });
    it('opens block', () => {
        const warm = document.querySelector('#t-warm-toggle');
        const mock_evt = {target: warm, preventDefault: jest.fn()};
        toggleSummary(mock_evt);
        expect(document.querySelector('#global-warming-details').style.display).toBe('block');
    });
    it('closes inline', () => {
        const girl = document.querySelector('#t-girl-toggle');
        const mock_evt = {target: girl, preventDefault: jest.fn()};
        girl.classList.toggle('stretchtext-open');
        toggleSummary(mock_evt);
        expect(document.querySelector('#t-girl-detail').style.display).toBe('none');
    });
    it('closes block', () => {
        const warm = document.querySelector('#t-warm-toggle');
        const mock_evt = {target: warm, preventDefault: jest.fn()};
        warm.classList.toggle('stretchtext-open');
        toggleSummary(mock_evt);
        expect(document.querySelector('#global-warming-details').style.display).toBe('none');
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
