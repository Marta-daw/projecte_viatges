import React from 'react';

export default function SelectOption({ value, children, ...props }) {
    return (
        <option value={value} {...props}>
            {children}
        </option>
    );
}
