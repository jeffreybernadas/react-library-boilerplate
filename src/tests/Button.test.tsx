import { render } from "@testing-library/react";
import { Button } from "../components";

describe("<Button />", () => {
  it("should equal snapshot", () => {
    const { baseElement } = render(<Button label="Button"/>);
    expect(baseElement).toMatchSnapshot();
  });
});
