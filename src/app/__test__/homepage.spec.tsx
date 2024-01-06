import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import RootLayout from "@/app/layout";

describe("Home Page", () => {
  it("should render", () => {
    const page = render(
      <RootLayout>
        <HomePage/>
      </RootLayout>
    );
    expect(page).toMatchSnapshot();
  });
});