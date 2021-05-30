import { useState, useCallback } from 'react';
import { noop } from '../utils/noop';

export type UseInputErrorType = string | false;

export interface UseInput {
    initialValue?: string;
    initialError?: UseInputErrorType;
    validate?: (value: string) => UseInputErrorType;
    onValidChange?: (value: string) => void;
}

export function useInput({
    initialValue = '',
    initialError = false,
    validate = () => false,
    onValidChange = noop,
}: UseInput) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(initialError);

    const handleInput = useCallback(
        (value: string) => {
            const validation = validate(value);
            if (!validation) {
                onValidChange(value);
            }

            setValue(value);
            setError(validation);
        },
        [
            validate,
            onValidChange
        ]
    );

    return {
        value,
        error,
        handleInput
    };
}
