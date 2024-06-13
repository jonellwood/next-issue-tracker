'use client';
import React from 'react';
import { Button, TextArea, TextField } from '@radix-ui/themes';

const NewIssuePage = () => {
	return (
		<div className='max-w-xl space-y-3'>
			<TextField.Root placeholder='Title'></TextField.Root>
			<TextArea placeholder='Have you tried turning it off and back on?' />
			<Button>Submit New Issue</Button>
		</div>
	);
};

export default NewIssuePage;
