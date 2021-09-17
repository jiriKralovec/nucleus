import {registerComponent} from '../nucleus/main';

window.onload = () => {
    registerComponent('new-button', (host) => {
        host.addEventListener('click', () => {
            alert('You clicked me!');
        });
        /**
         * Return template
         */
        return `
            Click me!
        `;
    }, {
        style: `
            :host {
                display: inline-flex;
                align-items: center;
                cursor: pointer;
                background: #ddd;
                border-radius: 4px;
                padding: 10px 12px;
                font-size: 11px;
            }
        `
    });
}