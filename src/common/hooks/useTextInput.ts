import React, { FormEvent, useState } from 'react';

type Result = [
	{ value: string; onChange: (e: FormEvent<HTMLInputElement>) => void },
	React.Dispatch<React.SetStateAction<string>>
];

const useTextInput = (initialValue: string): Result => {
	const [value, setValue] = useState(initialValue);
	const onChange = (e: FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		setValue(target.value);
	};
	return [{ value, onChange }, setValue];
};

export default useTextInput;
