import React from 'react';

interface CheckboxProps {
    checked: boolean;
    indeterminate?: boolean;
    onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, indeterminate, onChange }) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            data-testid="checkbox"
            ref={(el) => {
                if (el) el.indeterminate = indeterminate || false;
            }}
            onChange={onChange}
            className="form-checkbox text-indigo-600 mr-2 w-4 h-4"
        />
    );
};

export default Checkbox;
