import React from 'react';
import renderer from 'react-test-renderer';

import PayslipLog from '../components/payportal/PayslipLog.component';

describe('Pay Portal Components', () => {
    test('Payslip Log', () => {
        const component = renderer.create(<PayslipLog />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})