import type { Component } from "solid-js";
import { render } from "solid-js/web";

export function mountSolid(
  node: HTMLElement,
  params: { App: Component<Record<string, unknown>>; props: Record<string, unknown> }
) {
  render(() => <params.App {...params.props} />, node);
}
