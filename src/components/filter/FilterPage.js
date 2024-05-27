import styles from './FilterPage.module.css';
import Filter from './Filter';

const FilterPage = ({ isVisible, onClose }) => {
  return (
    <>
   
    {/* <div className={`${styles.filterPage} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.header}>
        <button onClick={onClose}>Close</button>
      </div>
      <div className={styles.content}>
        <h2>Filter Options</h2>
        <Filter/>
      </div>
    </div> */}
    </>
  );
};

export default FilterPage;
