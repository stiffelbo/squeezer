import React from "react";

const SelectSimple = ({ name, options, value, onChange }) => {
    const classes = value ? 'bg-warning' : '';
    return (
        <div className="form-group">
        <select
            key={name} 
            name={name} 
            id={name} 
            value={value}
            className={`form-control ${classes}`} 
            onChange={e => onChange(name, e.currentTarget.value)}
            >

            <option key="empty" value="" >{name}..</option>
            {options && options.map(option => (
            <option key={option} value={option}>
                {option}
            </option>
            ))}
        </select>
        </div>
    );
};

export default SelectSimple;