import React from 'react';
import Question from "../../../src/components/test-page/Question";
import MultipleChoice from "../../../src/components/test-page/MiltipleChoice";
import OnlyChoice from "../../../src/components/test-page/OnlyChoice";

describe('Question', () => {
    const mountMultiple = (multiple) => {
        return shallow(<Question
            id={1}
            question={'Text'}
            options={[{id: 1, text: 'option'}]}
            answer={[]}
            multiple={multiple}/>);
    };

    it('should render question text', () => {
        const component = mountMultiple(false);

        const text = component.find('h3');
        expect(text).toHaveLength(1);
        expect(text.text()).toEqual('Text');
    });

    it('should render radio group if \'multiple\' is \'false\'', () => {
        const component = mountMultiple(false);
        expect(component.find(OnlyChoice)).toHaveLength(1);
    });

    it('should render checkbox group if \'multiple\' is \'true\'', () => {
        const component = mountMultiple(true);
        expect(component.find(MultipleChoice)).toHaveLength(1);
    });
});