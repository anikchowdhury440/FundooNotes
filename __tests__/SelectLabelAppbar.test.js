import React from 'react';
import {shallow} from 'enzyme';
import SelectLabelAppbar from '../src/components/dashboard/SelectLabelAppbar';

describe('test SelectLabelAppbar', () => {
    it('should match to snapshot', () => {
        const component = shallow(<SelectLabelAppbar />)
        expect(component).toMatchSnapshot();
    })

})