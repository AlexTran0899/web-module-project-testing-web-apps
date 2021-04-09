import React from 'react';
import {render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import { useEventCallback } from '@material-ui/core';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>); 
    const header = screen.getByText('Contact Form');
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first Name*/i);
    userEvent.type(firstName, 'taat');
    const error = screen.getByTestId('error');
    expect(error)
    console.log()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole('button')
    userEvent.click(button);

    const error = await screen.queryAllByTestId('error');
    expect(error.length).toEqual(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first Name*/i);
    userEvent.type(firstName, 'taaaat'); 
    const lastName = screen.getByLabelText(/last Name*/i);
    userEvent.type(lastName, 'taat'); 
    const button = screen.getByRole('button')
    userEvent.click(button);

    const error = await screen.findByText('Error: email must be a valid email address.');
    expect(error)
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'taat'); 

    const error = await screen.findByText('Error: email must be a valid email address.');
    expect(error)

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first Name*/i);
    userEvent.type(firstName, 'taaaat'); 
    const lastName = screen.getByLabelText(/last Name*/i);
    userEvent.type(lastName, ''); 
    const button = screen.getByRole('button')
    userEvent.click(button);

    const error = await screen.findByText('Error: lastName is a required field.');
    expect(error)
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first Name*/i);
    userEvent.type(firstName, 'taaaat'); 
    const lastName = screen.getByLabelText(/last Name*/i);
    userEvent.type(lastName, 'adasd'); 
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'adasd@asdad.com'); 
    const button = screen.getByRole('button')
    userEvent.click(button);

    const submitted = screen.queryByText('Message:');
    expect(submitted).toBeFalsy();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first Name*/i);
    userEvent.type(firstName, 'taaaat'); 
    const lastName = screen.getByLabelText(/last Name*/i);
    userEvent.type(lastName, 'adasd'); 
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'adasd@asdad.com'); 
    const message = screen.getByLabelText(/message*/i);
    userEvent.type(message, 'adasd@asdad.com'); 
    const button = screen.getByRole('button')
    userEvent.click(button);


    const submitted = screen.queryByText('Message:');
    expect(submitted)
});