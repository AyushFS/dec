import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
	return (
		<div className={styles.footer}>
			<div>{new Date().getFullYear()}</div>
			<div>Funding Societies Pte. Ltd.</div>
			<div>All rights reserved.</div>
			<div>Version: 1346c8c</div>
		</div>
	);
};

export default Footer;
