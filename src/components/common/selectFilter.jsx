import React from "react";

const SelectFilter = ({ name, label, options, value, ...rest }) => {
const classes = value ? 'bg-warning' : '';
  return (
    <div className="form-group">
      <select name={name} id={name} {...rest} className={`form-control ${classes}`}>
        <option key="default" value="" >{name}</option>
        {options && options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;