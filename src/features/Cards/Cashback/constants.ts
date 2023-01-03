import merchantGrab from './images/merchant_grab.png';
import merchantPaypal from './images/merchant_paypal.png';
import merchantCardup from './images/merchant_cardup.png';
import merchantGoogle from './images/merchant_gpay.png';
import merchantAws from './images/merchant_aws.png';
import merchantLazada from './images/merchant_lazada.png';
import merchantAxs from './images/merchant_axs.png';
import merchantMore from './images/merchant_more.png';

export enum TransferStatus {
	CONFIRM = 'CONFIRM',
	PENDING = 'PENDING',
}
export interface MerchantIcon {
	imageUrl: string;
	title: string;
}

export const merchantIcons: MerchantIcon[] = [
	{
		imageUrl: merchantGrab,
		title: 'Grab',
	},
	{
		imageUrl: merchantPaypal,
		title: 'PayPal',
	},
	{
		imageUrl: merchantCardup,
		title: 'CardUp',
	},
	{
		imageUrl: merchantGoogle,
		title: 'Google',
	},
	{
		imageUrl: merchantAws,
		title: 'AWS',
	},
	{
		imageUrl: merchantLazada,
		title: 'Lazada',
	},
	{
		imageUrl: merchantAxs,
		title: 'AXS',
	},
	{
		imageUrl: merchantMore,
		title: 'More',
	},
];
