import React from "react";
import List from "../pages/List";
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
            <List />
        </ChakraProvider>)
    });

    test("it should render the list title", () => {
        expect(screen.getByText(/Users List/i)).toBeInTheDocument();
    });

    test("it should render users email addresses", async () => {
        const userEmails = await screen.findAllByText(/@reqres.in/i)
        expect(userEmails.length).toBeGreaterThan(0);
    });
});