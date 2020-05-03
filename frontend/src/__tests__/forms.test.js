import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';

import LoginForm from '../components/forms/LoginForm.component';
import ModifyUserForm from '../components/forms/ModifyUserForm.component';
import RegistrationForm from '../components/forms/RegistrationForm.component';

describe('Form Components', () => {
    test('Login', () => {
        const component = renderer.create(<LoginForm/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Modify User', () => {
        const component = renderer.create(<Router><ModifyUserForm /></Router>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Register', () => {
        const component = renderer.create(<RegistrationForm />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})