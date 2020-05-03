import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Dashboard from '../components/dashboard/Dashboard.component';
import DashboardItem from '../components/dashboard/DashboardItem.component';

describe('Dashboard Components', () => {
    test('Dashboard', () => {
        const component = renderer.create(<Router><Dashboard /></Router>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Dashboard Item', () => {
        const component = renderer.create(<DashboardItem />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})