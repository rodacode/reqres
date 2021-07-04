import React from "react";
import AddUserForm from "../components/AddUserForm";
import { render, screen, RenderOptions } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from "@chakra-ui/react"
import theme from "@chakra-ui/theme"
let mock = () => { }


describe("List [PAGE]", () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query) => {
            return {
                matches: false,
                media: query,
                onchange: null,
                addListener: mock, // deprecated         
                removeListener: mock, // deprecated
                addEventListener: mock,
                removeEventListener: mock,
                dispatchEvent: mock,
            }
        }
    });
    beforeEach(() => {
        render(<ChakraProvider theme={theme}>
            <AddUserForm />
        </ChakraProvider>)
    });

    test("it should render the submit button", () => {
        expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    });

});