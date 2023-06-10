export function query<K extends keyof HTMLElementTagNameMap>(
  name: K | `${K}.${string}` | `${K}#${string}` | `${K}[${string}]`,
  parent: HTMLElement = document.body
) {
  return parent.querySelector(name) as HTMLElementTagNameMap[K]
}
