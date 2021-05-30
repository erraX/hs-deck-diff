import React from 'react';
import DeckDiffContainer from './components/DeckDiffContainer';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.App}>
    <h1 className={styles.Title}>Hearthstone deck diff</h1>
    <DeckDiffContainer />
  </div>
);

export default App;
