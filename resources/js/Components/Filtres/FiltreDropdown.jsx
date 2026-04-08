import React from 'react'

export default function FiltreDropdown({ options, value, onChange }) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">Seleccionar categoría</option>

            {options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                    {opt.name}
                </option>
            ))}
        </select>
    );
}
