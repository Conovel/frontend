import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";

// Mock the SentencesApi
jest.mock("../api/api", () => ({
  SentencesApi: jest.fn().mockImplementation(() => ({
    getSentenceById : jest.fn().mockResolvedValue({
      data: {
        main: {
          sentence_id: 1,
          sentence: "吾輩は猫である。",
          created_at: "2024-10-02T23:03:57.431Z",
          updated_at: "2024-10-02T23:03:57.431Z"
        }
      }
    }),
  })),
}));

test("fetches and displays sentences", async () => {
  render(<App />);

  // Verify initial state
  expect(screen.getByText("Fetch Sentences")).toBeInTheDocument();

  // Click the fetch button
  fireEvent.click(screen.getByText("Fetch Sentences"));

  // Wait for the sentences to be displayed
  await waitFor(() => expect(screen.getByText("吾輩は猫である。")).toBeInTheDocument());
});