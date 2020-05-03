import React from 'react';
import renderer from 'react-test-renderer';

import Alert from '../components/notifiers/Alert.component';
import Greeting from '../components/notifiers/Greeting.component';
import Info from '../components/notifiers/Info.component';

describe('Notifier Components', () => {
    test('Alert', () => {
        const component = renderer.create(<Alert />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Greeting', () => {
        const component = renderer.create(<Greeting />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Info => Error', () => {
        const component = renderer.create(<Info status="error" />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Info => Warning', () => {
        const component = renderer.create(<Info status="warning" />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Info => Success', () => {
        const component = renderer.create(<Info status="success" />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})