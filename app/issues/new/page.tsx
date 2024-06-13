'use client';
// import React from 'react';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
// import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const router = useRouter();
	const { register, control, handleSubmit } = useForm<IssueForm>();
	return (
		<form
			className='max-w-xl space-y-3'
			onSubmit={handleSubmit(async (data) => {
				console.log(data);
				try {
					const response = await fetch('../api/issues', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					});
					if (!response.ok) {
						throw new Error(`HTTP error status: ${response.status}`);
					}
					router.push('/issues');
				} catch (error) {
					console.error('There was a problem with the fetch operation:', error);
				}
			})}
		>
			<TextField.Root
				placeholder='Title'
				{...register('title')}
			></TextField.Root>
			<Controller
				name='description'
				control={control}
				render={({ field }) => (
					<SimpleMDE
						placeholder='Have you tried turning it off and back on again?'
						{...field}
					/>
				)}
			/>
			<Button>Submit New Issue</Button>
		</form>
	);
};

export default NewIssuePage;

// holy crap this is complicated. SimpleMDE can not be registered in the useForm function so we get import Controller from react-hook-form and wrap the SimpleMDE in the control while passing the name prop. We also get the control object when we destructure the useForm adn pass that as the control prop. Finally the render prop receives the SimpleMDE object. We also give the render function a prop and destructure it get the field property and then spread the field object into the SimpleMDE so we can surface the properties such as onBlur and all that stuff
