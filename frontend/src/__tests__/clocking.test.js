import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Day from '../components/clocking/day.component';
import Week from '../components/clocking/week.component';
import QR from '../components/clocking/QR.component';
import ClockStatusBox from '../components/clocking/ClockStatusBox.component';
import ClockLogBox from '../components/clocking/ClockLogBox.component';

describe('Clocking Components', () => {
    test('Day => out', () => {
        const component = renderer.create(<Day status="out"/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Day => in', () => {
        const component = renderer.create(<Day status="in" />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Week', () => {
        const component = renderer.create(<Week />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('QR', () => {
        const component = renderer.create(<QR id="1234567890" />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Clock Status Box', () => {
        const component = renderer.create(<ClockStatusBox />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Clock Log Box', () => {
        const component = renderer.create(<Router><ClockLogBox /></Router>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})