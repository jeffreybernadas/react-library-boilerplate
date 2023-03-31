import { render } from "@testing-library/react";
import { Page } from "../components";

describe("<Page />", () => {
  it("should equal snapshot", () => {
    const { baseElement } = render(<Page />);
    expect(baseElement).toMatchSnapshot();
  });
});
