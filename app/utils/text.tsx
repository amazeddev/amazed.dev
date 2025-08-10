import React from "react";

export function structText(text: string): React.JSX.Element[] {
  return text.split("\n").map((str, index) => <p key={index}>{str}</p>);
}
