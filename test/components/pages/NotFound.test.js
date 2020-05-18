import React from 'react';
import NotFound from "../../../src/components/pages/NotFound";

describe('Not found page', () => {
    it('should render correctly', () => {
        const page = shallow(<NotFound/>);
        expect(page).toMatchSnapshot();
    });
});