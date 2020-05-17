import React from 'react';
import {NativeSelect, Input} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const customStyles = makeStyles({
    root: {
        width: '10em',
        marginRight: '.45em',
        background: '#f8f8f8',
        borderRadius: '5px',
        color: '#450907',
        fontWeight: '600',
        textAlign: 'justify',
        textAlignLast: 'center',
        fontStyle: 'italic'
    }
});

function SelectComp(props) {
    const classes = customStyles()
    return (
        <>
            <div className="time-select-content time-select-content-header">{props.tHeaderName} :</div>
            <div className="time-select-content">
                <NativeSelect
                input={<Input classes={{root: classes.root}} />}
                value={props.optVal} 
                onChange={props.changefunc}
                disabled={(props.noHistory || props.graphError) ? true: false}
                >
                    {
                      (props.noHistory || props.graphError) ? <option>---</option>: 
                      props.content.map((curr, index) => <option key={index} value={curr}>{curr}</option>)
                    }
                </NativeSelect>
            </div>
        </>
    )
}

export default SelectComp
