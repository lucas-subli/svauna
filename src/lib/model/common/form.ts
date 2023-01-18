export type InputMode =
	| 'text'
	| 'tel'
	| 'url'
	| 'email'
	| 'numeric'
	| 'decimal'
	| 'search'
	| 'none'
	| null;

export type InputCapture = boolean | 'user' | 'environment' | null;

type CustomValidationRule = {
	pattern: string;
	showMessage: boolean;
	message: string;
};
export type CustomValidator = {
	errors?: CustomValidationRule[];
	warnings?: CustomValidationRule[];
};

export type FormType =
	| 'text'
	| 'email'
	| 'password'
	| 'url'
	| 'tel'
	| 'checkbox'
	| 'radio'
	| 'number'
	| 'range'
	| 'date'
	| 'month'
	| 'week'
	| 'time'
	| 'datetime-local'
	| 'search'
	| 'file'
	| 'image'
	| 'color'
	| 'hidden'; // custom type

export type InvalidHandlerResponse = {
	errors: string[];
	warnings: string[];
};
