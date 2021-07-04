import React from "react";
import Signup from "../pages/Signup";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';

describe("Signup [PAGE]", () => {
    const history = createMemoryHistory();

    beforeEach(() => {
        render(
            <Router history={history}>
                <Signup />
            </Router>)
    });

    test("it should render the subtitle", () => {
        expect(screen.getByText(/get started/i)).toBeInTheDocument();
    });

    test("it should not display the error message and redirects if user enters the right email and password", async () => {

        const emailInput = screen.getByTestId('signup__email__input');

        await userEvent.type(emailInput, 'eve.holt@reqres.in');

        const passwordInput = screen.getByTestId('signup__password__input');

        await userEvent.type(passwordInput, 'pistol');

        const loginButton = screen.getByText(/Sign up/i);

        await userEvent.click(loginButton);

        expect(screen.queryByText(/Wrong email or password/i)).not.toBeInTheDocument()
    });


    test("it should display the error message if user enters wrong email or password", async () => {

        const emailInput = screen.getByTestId('signup__email__input');

        await userEvent.type(emailInput, 'John');

        const passwordInput = screen.getByTestId('signup__password__input');

        await userEvent.type(passwordInput, '1234');

        const loginButton = screen.getByText(/Sign up/i);

        await userEvent.click(loginButton);

        await screen.findByText(/Wrong email or password/i)

        expect(screen.getByText(/Wrong email or password/i)).toBeInTheDocument();
    });

});