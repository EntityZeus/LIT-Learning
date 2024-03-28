import {html, css, LitElement} from 'lit';
import {property, state, customElement} from 'lit/decorators.js';
import "./counter-element.js";

@customElement('stopwatch-element')
export class Stopwatch extends LitElement {
    static get styles(){
        return [
          css`
            :host {
              margin: 0px;
              padding: 10px;
            }
            .input {
              width: 300px;
              border-radius: 6px;
              border: 1px solid rgb(237, 240, 245);
              background-color: rgb(242, 245, 250);
              line-height: calc(1.35714em);
              padding: calc(0.535714em) calc(1.07143em);
              box-shadow: rgba(10, 10, 10, 0.05) 0px 0.0625em 0.125em inset;
              max-width: 100%;
              color: #363636;
              appearance: none;
              align-items: center;
              display: inline-flex;
              font-size: var(--size-4);
              justify-content: flex-start;
              position: relative;
              vertical-align: top;
            }
            .parent {
              display: flex;
              flex-direction: column;
              height: 100vh;
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
            p {
                font-size: 35px;
            }
          `,
        ];
    }
    @property({type: Number}) time: number = 0;
    @state() timeInHoursMinutesSeconds: string = "00:00:00";
    @state() state: string = "Start";

    interval: any;

    handleChange(e: Event){
        const target = e.target as HTMLInputElement;
        this.time = parseInt(target.value) > 0 ? parseInt(target.value) : 0;
        this.timeInHoursMinutesSeconds = this.convertTime(this.time);
    }

    convertTime(time: number){
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        let str = "";
        if(hours < 10){
            str=`0${hours}`;
        }else{
            str=`${hours}`;
        }
        if(minutes < 10){
            str+=`:0${minutes}`;
        }else{
            str+=`:${minutes}`;
        }
        if(seconds < 10){
            str+=`:0${seconds}`;
        }else{
            str+=`:${seconds}`;
        }
        return str;
    }

    handleClick(){
        if(this.time <= 0) return;
        if(this.state === "Start"){
            this.state = "Pause";
            this.interval = setInterval(()=>{
                this.time--;
                if(this.time <= 0){
                    clearInterval(this.interval);
                    this.state = "Start";
                }
                this.timeInHoursMinutesSeconds = this.convertTime(this.time);
            }, 1000);
        }else{
            this.state = "Start";
            clearInterval(this.interval);
        }
    }

    render() {
        return html `
        <div class="parent">
            <p>${this.timeInHoursMinutesSeconds}</p>
            <input class="input" type="number" ?disabled=${this.state === 'Pause'} @change=${this.handleChange}> <br/>
            <button class="button is-primary" @click=${this.handleClick}>${this.state}</button>
        </div>
        `
    }
}
