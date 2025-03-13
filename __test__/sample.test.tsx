import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// サンプルテスト用のコンポーネント
const SampleComponent = () => {
  return <div>Sample Test Component</div>;
};

describe("Sample Test", () => {
  it("renders sample component", () => {
    render(<SampleComponent />);
    expect(screen.getByText("Sample Test Component")).toBeInTheDocument();
  });

  it("performs basic math", () => {
    expect(1 + 1).toBe(2);
  });
});
