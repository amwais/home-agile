import React from 'react';
import { Button } from 'semantic-ui-react';

export const AddButton = (props) => (
	<div>
		<Button onClick={props.onClick} icon="plus circle" size="medium" />
	</div>
);
