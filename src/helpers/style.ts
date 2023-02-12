export function setUserSelect(element: HTMLElement, value: string) {
    element.style.userSelect = value;
    element.style.webkitUserSelect = value;
    // @ts-ignore
    element.style.webkitTouchCallout = value;
}