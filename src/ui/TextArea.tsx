import React from 'react';
import cls from 'classnames';

import styles from './TextArea.module.scss';

export interface TextAreaProps {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  className = '',
  defaultValue = '',
  disabled = false,
  error = true,
  placeholder = '',
  readOnly = false,
  value = '',
  onChange = () => { },
} = {}) => {
  return (
    <textarea
      className={cls(
        [styles.textarea, className],
        { [styles.error]: error }
      )}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      value={value}
      onChange={evt => onChange(evt.target.value)}
    />
  )
};

export default TextArea;
