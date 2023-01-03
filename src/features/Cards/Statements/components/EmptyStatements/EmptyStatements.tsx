import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import styles from './EmptyStatements.module.scss';
import emptyStatementsImage from '../../assets/empty-statements.svg';
import Image from '../../../../../components/Image';

interface EmptyStatementsProps {}

const EmptyStatements: ReactFCC<EmptyStatementsProps> = () => {
	const { t } = useTranslation();
	return (
		<div className={styles.EmptyStatements} data-testid="empty-statements-component">
			<Image src={emptyStatementsImage} />
			<div className={styles.EmptyStatementsTitle}>{t('statements.empty_statements.title')}</div>
			<div className={styles.EmptyStatementsDesc}>{t('statements.empty_statements.description')}</div>
		</div>
	);
};

export default EmptyStatements;
