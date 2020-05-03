import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';

import NavBar from '../components/AppNavbar.component';
import News from '../components/News.component';
import Schedule from '../components/Schedule.component';

describe('Miscellaneous Components', () => {
    test('Navigation Bar', () => {
        const component = renderer.create(<Router><NavBar /></Router>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('News', () => {
        const component = renderer.create(<News />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Schedule', () => {
        const component = renderer.create(<Schedule />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})