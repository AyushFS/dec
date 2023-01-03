import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import { downloadFile, viewFile, getFileBlobById } from '../../common/utilities/documentUtils';
import { StatementData } from '../../features/Cards/Statements/interface';
import styles from './DownloadFileComponent.module.scss';

interface DownloadFileComponentProps {
	statement: StatementData;
	element?: any;
	elementAttrs?: any;
	forceDownloadFile?: boolean;
}

const DownloadFileComponent: ReactFCC<DownloadFileComponentProps> = (props) => {
	const { statement, element, elementAttrs, forceDownloadFile, children } = props;
	const HtmlElement = element || 'div';
	const onDownloadClickHandler = async () => {
		const fileBlob = await getFileBlobById(statement.dmsId);
		const fileName = `statement_${statement.generationYear}_${statement.generationMonth}.pdf`;
		return forceDownloadFile ? downloadFile(fileBlob, fileName) : viewFile(fileBlob);
	};

	return (
		<HtmlElement
			{...elementAttrs}
			className={styles.DownloadFile}
			data-testid="download-file-component"
			onClick={onDownloadClickHandler}
		>
			{children}
		</HtmlElement>
	);
};

export default DownloadFileComponent;
