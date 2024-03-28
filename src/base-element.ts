import { html, css, LitElement } from "lit";
import { property,customElement } from "lit/decorators.js";
import { Router } from '@vaadin/router';
import { routes } from './routes.js';

@customElement("base-element")
export class BaseElement extends LitElement {
    static get styles() {
        return [
            css `
             .nav-bar {
                display: inline-flex;
             }
             .nav-item {
                list-style: none;
                padding: 10px;
                cursor: pointer;
                margin-right: 10px;
             }
             a {
                text-decoration: none;
                color: black;
             }
             .active{
                text-decoration: none;
                background-color: rgb(0, 161, 210);
                color: white;
                border-radius: 5px;
                border: none;
             }
            `
        ]
    }
    @property({type: String}) active: string="/";

    firstUpdated() {
        const outlet = this.shadowRoot?.getElementById('outlet');
        const router = new Router(outlet);
        router.setRoutes(routes as any);
    }
    constructor(){
        super();
        this.active=window.location.pathname;
    }

    onLocationChanged(e: CustomEvent ){
        this.active=e.detail.router.location.routes[1].path;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('vaadin-router-location-changed', this.onLocationChanged);
    }
    disconnectedCallback() {
        window.removeEventListener('vaadin-router-location-changed', this.onLocationChanged);
        super.disconnectedCallback();
    }

    render() {
        return html`
            <ul class="nav-bar">
               <a href="/counter" 
                    class="${(this.active === '/' || this.active === '/counter') ? 'active' : ''}"
                    @click=${()=>{ this.active="/counter" }}> 
                    <li class="nav-item">Counter Application</li>
                </a>
                <a href="/todo-application" @click=${()=>{ this.active="/todo-application" }}
                    class="${this.active === '/todo-application' ? 'active' : ''}">
                    <li class="nav-item">Todo Application</li>
                </a>
                <a href="/stopwatch-application" @click=${()=>{ this.active="/stopwatch-application" }}
                    class="${this.active === '/stopwatch-application' ? 'active' : ''}"> 
                    <li class="nav-item">Stopwatch Application</li>
                </a>
            </ul>
            <hr>

            <main id="outlet"></main>
        `
    }
}