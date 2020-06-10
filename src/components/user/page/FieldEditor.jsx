import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import {TextField} from "@material-ui/core";
import '../../../styles/component/user/fieldEditor.css';

class FieldEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
    }

    editHandler = () => {
        this.setState({
            editMode: true,
            editedValue: this.props.value
        })
    };

    fieldChangeHandler = (event) => {
        this.setState({editedValue: event.target.value});
    };

    submitHandler = () => {
        this.setState({editMode: false});
        this.props.changeFunction(this.state.editedValue);
    };

    render() {
        const {value} = this.props;
        const {editMode, editedValue} = this.state;

        return (
            <div>
                {editMode ?
                    <form onSubmit={this.submitHandler}>
                        <TextField value={editedValue} onChange={this.fieldChangeHandler} className='value'/>
                    </form>
                    :
                    <h1 className='value'>{value}
                        <EditIcon className='edit-icon' onClick={this.editHandler}/>
                    </h1>
                }
            </div>
        )
    }
}

export default FieldEditor;