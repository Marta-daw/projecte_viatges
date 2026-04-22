import React from 'react';
import styles from './FiltreDropdown.module.scss';

export default function FiltreDropdown({ options, value, onChange, onClear, label = 'Seleccionar' }) {
    const safeOptions = Array.isArray(options) ? options : [];

    return (
        <div className={styles.filterWrapper}>
            <label className={styles.filterLabel}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 22L20 20" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {label}
            </label>

            <div className={styles.selectWrapper}>
                <select
                    className={styles.select}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    <option value="">Seleccionar {label.toLowerCase()}</option>

                    {safeOptions.map((opt) => {
                        const optionValue = typeof opt === 'object' ? opt.id : opt;
                        const optionLabel = typeof opt === 'object' ? opt.name : opt;

                        return (
                            <option key={optionValue} value={optionValue}>
                                {optionLabel}
                            </option>
                        );
                    })}
                </select>
            </div>

            {value && (
                <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={onClear}
                >
                    Limpiar
                </button>
            )}
        </div>
    );
}