import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DownloadIcon } from '../../../../../assets/images/icons/download.svg';
import { ReactComponent as ArrowRight } from '../../../../../assets/images/icons/arrow-right.svg';
import { ReactFCC } from '../../../../../common/interface/react';
import { getShortMonthName } from '../../../../../common/utilities/validationChecker/Utils';
import Button from '../../../../../components/Button';
import FsIcon from '../../../../../components/FsIcon';
import { IconTypes } from '../../../../../components/FsIcon/constants';
import EmptyStatements from '../EmptyStatements';
import DownloadFileComponent from '../../../../../components/DownloadFileComponent';
import { StatementData } from '../../interface';
import styles from './StatementList.module.scss';

interface StatementListProps {
	statements: StatementData[];
}

const StatementList: ReactFCC<StatementListProps> = ({ statements }) => {
	const { t } = useTranslation();

	const containerProps = {
		className: styles.StatementList,
		'data-testid': 'statement-list-component',
	};

	if (statements.length === 0) {
		return (
			<div {...containerProps}>
				<EmptyStatements />
			</div>
		);
	}

	return (
		<div {...containerProps}>
			<section>
				<header className={`${styles.header} ${styles.headerText}`}>
					<div className={styles.col}>{t('statements.statements_list.date')}</div>
					<div className={`${styles.col} ${styles.right}`}>{t('statements.statements_list.action')}</div>
				</header>
				{statements.map((statement: StatementData) => (
					<div key={statement.uuid} className={styles.row}>
						<div className={`${styles.col} ${styles.date}`}>
							{t(`common.months_short.${getShortMonthName(statement.generationMonth - 1).toLocaleLowerCase()}`)}{' '}
							{statement.generationYear}
						</div>
						<div className={`${styles.col} ${styles.actions} ${styles.right}`}>
							<DownloadFileComponent
								element={Button}
								elementAttrs={{
									link: true,
									disabled: statement.dmsId <= 0,
								}}
								statement={statement}
								forceDownloadFile
							>
								<FsIcon size={24} type={IconTypes.svg}>
									<DownloadIcon />
								</FsIcon>
							</DownloadFileComponent>
							<DownloadFileComponent
								element={Button}
								elementAttrs={{
									link: true,
									disabled: statement.dmsId <= 0,
								}}
								statement={statement}
							>
								<FsIcon size={24} type={IconTypes.svg}>
									<ArrowRight />
								</FsIcon>
							</DownloadFileComponent>
						</div>
					</div>
				))}
			</section>
		</div>
	);
};

export default StatementList;
