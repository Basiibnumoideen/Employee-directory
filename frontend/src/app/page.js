'use client';
import styles from './page.module.css';
import EmployeeList from './components/EmployeeList';

export default function Home() {
  return (
    
    <div className={styles.page}>
      <main className={styles.main}>
        
          <EmployeeList />
        
      </main>
    </div>
  );
}
