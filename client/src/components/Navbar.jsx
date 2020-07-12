import React from 'react';
import Link from 'next/link';

import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={`${styles.container}`}>
      <Link href='/' passHref>
        <a className={`${styles.title}`}><strong>Delayed Messages</strong></a>
      </Link>
    </div>
  );
};

export default Navbar;
