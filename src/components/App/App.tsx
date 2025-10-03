import React from 'react';
import styles from './App.module.css';
import Game from '../Game/Game';


const App: React.FC = () => {
return (
<div className={styles.appContainer}>
<header className={styles.header}>
<div className={styles.logo}>TD</div>
<div>
<h1 className={styles.title}>Typing Keyboard Game — Test</h1>
<p className={styles.subtitle}>Click letters or press keys. 20s sessions. Golden letters = ×2 points.</p>
</div>
</header>


<main className={styles.mainGrid}>
<Game />
<aside className={styles.docPanel}>
<h3 className={styles.docTitle}>Part A — Theory (short)</h3>
<p className={styles.docText}>Answers and README are in project README. This panel is placeholder.</p>
</aside>
</main>
</div>
);
};


export default App;