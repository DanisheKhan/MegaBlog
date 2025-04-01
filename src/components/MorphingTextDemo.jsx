import { MorphingText } from "./magicui/morphing-text";

const texts = [
  "DanishKhan",
  "FullStackDeveloper",
  "DanishKhan",
  "WebDeveloper",
  "DanishKhan",
  "ReactDeveloper",
];

export function MorphingTextDemo() {
  return <MorphingText texts={texts} />;
}
