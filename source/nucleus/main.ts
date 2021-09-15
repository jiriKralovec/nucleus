import { Module } from './lib/dependency';

export class App {
    public b: Module;
    constructor() {
        this.b = new Module();
    }
}

console.log('here');