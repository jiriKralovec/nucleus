import { ComponentOptions, ComponentSelector, ComponentTemplate, ComponentTemplateHost } from "./register_component.types";

export const registerComponent = (
    selector: ComponentSelector,
    callback: (host: HTMLElement) => string,
    options?: ComponentOptions
) => {
    customElements.define(
        selector,
        class extends HTMLElement {
            public readonly host: ShadowRoot;
            constructor() {
                super();
                this.host = this.attachShadow({mode: 'open'});
                this.renderTemplate();
                this.renderStyleIfAny();
            }
            private renderTemplate() {
                const t = document.createElement('template');
                t.innerHTML = callback(this);
                this.host.append(...t.content.childNodes);
            }
            private renderStyleIfAny() {
                if(!options.style)
                    return;
                const t = document.createElement('style');
                t.innerText = options.style;
                this.host.prepend(t);
            }
        }
    );
}