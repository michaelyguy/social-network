import React from "react";
import App from "./app";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

jest.mock("./axios");

test("App show nothing at first and then render divs after all the async is done", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 2,
            first: "guy",
            last: "michaely",
            profilPic: "/burek.jpg",
        },
    });

    const { container } = render(<App />);

    expect(container.children.length).toBe(0);

    await waitForElement(() => container.querySelector("div"));

    expect(container.children.length).toBe(1);
});
