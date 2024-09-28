import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";

// Mock the PetsApi
jest.mock("../api/api", () => ({
  PetsApi: jest.fn().mockImplementation(() => ({
    listPets: jest.fn().mockResolvedValue({ data: [{ id: 1, name: "コノベル太郎" }] }),
  })),
}));

test("fetches and displays pets", async () => {
  render(<App />);

  // Verify initial state
  expect(screen.getByText("Fetch Pets")).toBeInTheDocument();

  // Click the fetch button
  fireEvent.click(screen.getByText("Fetch Pets"));

  // Wait for the pets to be displayed
  await waitFor(() => expect(screen.getByText("コノベル太郎")).toBeInTheDocument());
});