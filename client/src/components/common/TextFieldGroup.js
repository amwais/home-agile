import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

const TextFieldGroup = ({ name, placeholder, value, error, info, type, onChange, disabled }) => {
	return (
		<div>
			<div className="field">
				<Input
					style={{ width: '25rem' }}
					focus
					type={type}
					className={classnames('input is-rounded', {
						'is-danger': error
					})}
					placeholder={placeholder}
					name={name}
					value={value}
					onChange={onChange}
					disabled={disabled}
					error={error}
				/>
				{info && (
					<div>
						<small>{info}</small>
					</div>
				)}
				{error && <div style={{ color: 'red' }}>{error}</div>}
			</div>
			<br />
		</div>
	);
};

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
	type: 'text'
};

export default TextFieldGroup;
