import { Theme } from "@radix-ui/themes";

export function GlobalTheme({ children }: { children: React.ReactNode }) {
  return (
    <Theme
      appearance="light"
      radius="large"
      accentColor="red"
      grayColor="mauve"
      panelBackground="translucent"
      className="font-poppins">
      {children}
    </Theme>
  );
}
