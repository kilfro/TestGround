import React from 'react';
import TabPanel from '../../../src/components/supporting/TabPanel';

describe('TabPanel', () => {
    it('should render children if this tab is selected', () => {
        const props = {
            tabPosition: 0,
            index: 0
        };

        const wrapper = shallow(
            <TabPanel {...props}>
                <span>This must be rendered</span>
            </TabPanel>);

        const span = wrapper.find('span');
        expect(span).toHaveLength(1);
        expect(span.text()).toEqual('This must be rendered');
    });

    it('should not render children if this tab is not selected', () => {
        const props = {
            tabPosition: 1,
            index: 0
        };

        const wrapper = shallow(
            <TabPanel {...props}>
                <span>This mustn't be rendered</span>
            </TabPanel>);

        const span = wrapper.find('span');
        expect(span).toHaveLength(0);
    });
});