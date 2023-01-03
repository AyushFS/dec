import React from 'react';
import FsIcon from '../../../../components/FsIcon';
import { IconTypes } from '../../../../components/FsIcon/constants';
import cardsImage from '../assets/cards.png';
import './AddCardBox.scss';

function AddCardBox() {
	return (
		<div className="add-card-box-component" data-testid="add-card-box-component">
			<div className="add-card-box__cards_image">
				<img src={cardsImage} alt="cards" />
			</div>
			<div className="add-card-box__icon">
				<FsIcon type={IconTypes.svg}>
					<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.66659 5.66659H5.66659V9.66659H4.33325V5.66659H0.333252V4.33325H4.33325V0.333252H5.66659V4.33325H9.66659V5.66659Z"
							fill="white"
						/>
					</svg>
				</FsIcon>
			</div>
			<div>
				<div className="add-card-box__title">Elevate your business</div>
				<div className="add-card-box__desc">
					Empower your team members. Assign cards to them and delegate business payments efficiently.
				</div>
				<div className="add-card-box__link">Add card now</div>
			</div>
		</div>
	);
}

export default AddCardBox;
