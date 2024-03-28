import { customElement,property } from "lit/decorators.js";
import { html, css, LitElement } from "lit";

@customElement("my-element")
export class MyElement extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          margin: 0px;
          padding: 10px;
        }
        .parent{
          display: flex;
          height: 60vh;
          justify-content: center;
          align-items: center;
        }
        .button {
          margin: 10px;
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }
        .is-primary {
          background-color: rgb(0, 161, 210);
          color: white;
        }
      `,
    ];
  }
  @property({type: Number}) count: number = 0;

  render(): unknown {
    return html`
    <div class="parent">
      <button
        class="button is-primary"
        @click=${() => {
          this.count += 1;
        }}>Click Count=${this.count}
      </button>
    </div>
    `;
  }
}