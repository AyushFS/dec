import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import './Image.scss';

interface ImageProps {
	responsive?: boolean;
	src: string;
	[key: string]: any;
}

const Image: ReactFCC<ImageProps> = (props) => {
	const { src, alt, responsive, className, ...restOfTheAttributes } = props;
	const classNames = [className, responsive ? 'img-fluid' : '']
		.filter((val) => val)
		.join(' ')
		.trim();
	const attributes = {
		className: classNames,
		...restOfTheAttributes,
	};
	return <img src={src} alt={alt || ''} {...attributes} />;
};

export default Image;
