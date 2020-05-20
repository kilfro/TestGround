import React from 'react';
import {Progress} from "../../../src/components/supporting/Progress";

describe('Progress', () => {
    it('should render correctly', () => {
        const component = mount(<Progress variant='determinate' value={50}/>);
        expect(component).toMatchSnapshot();
    });
});