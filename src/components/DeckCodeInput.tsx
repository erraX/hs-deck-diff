import React from 'react';
import cls from 'classnames';

import TextArea from '../ui/TextArea';

import { useInput } from '../hooks/useInput';

import { decodeDeckCode } from '../utils/decodeDeckCode';
import { noop } from '../utils/noop';

import styles from './DeckCodeInput.module.scss';

import type { DeckDefinition } from 'deckstrings';

export interface DeckCodeInputProps {
  onDecode?: (deck: DeckDefinition) => void;
}

const DeckCodeInput: React.FC<DeckCodeInputProps> = ({ onDecode = noop }) => {
  const {
    value,
    error,
    handleInput
  } = useInput({
    validate: value => decodeDeckCode(value) === null ? 'invalid deck code' : false,
    onValidChange: value => onDecode(decodeDeckCode(value) as DeckDefinition),
  });

  return (
    <div className={styles.DeckCodeInput}>
      <TextArea
        className={cls(styles.Input)}
        placeholder="Please input deck code"
        value={value}
        error={!!error}
        onChange={handleInput}
      />
      { !!error && <span className={styles.InputErrorHint}>{error}</span>}
    </div>
  )
};

export default DeckCodeInput;
