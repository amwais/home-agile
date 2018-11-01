import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export const AddButton = (props) => (
	<div>
		{/* <Button onClick={props.onClick} icon="plus circle" size="medium" /> */}
		<Button onClick={props.onClick} animated="vertical">
			<Button.Content hidden>Add</Button.Content>
			<Button.Content visible>
				<Icon name="plus circle" />
			</Button.Content>
		</Button>
	</div>
);
