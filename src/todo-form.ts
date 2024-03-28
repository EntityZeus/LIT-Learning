import {html, css, LitElement} from 'lit';
import type { todoList } from './todoList';
import {customElement, property} from 'lit/decorators.js';

@customElement('todoform-element')
export class TodoForm extends LitElement {
    static get styles(){
        return [
            css `
            .input{
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
            .box{
                background-color: white;
                border-radius: 5px;
                box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
                color: #4a4a4a;
                display: flex;
                flex-direction: column;
                padding: 1.25rem;
                width: 50%;
            }
            .box label{
                margin-bottom: 10px;
                margin-top: 10px;
                font-weight: bold;
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
            `
        ]
    }
    @property({type: Object}) todoItem: todoList = {
        taskName: "",
        status: "",
        taskType: "",
        taskId: "0",
        taskPriority: ""    
    }

    handleSubmit(e: CustomEvent){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const obj: todoList = {
            taskName: "",
            status: "",
            taskType: "",
            taskId: "0",
            taskPriority: ""
        };
        obj.taskName = formData.get("taskName") as string;
        obj.status = formData.get("status") as string;
        obj.taskType = formData.get("taskType") as string;
        obj.taskId = formData.get("taskID") as string;
        obj.taskPriority = formData.get("priority") as string;
        const formEle = this.shadowRoot?.getElementById("form") as HTMLFormElement;
        formEle.reset();
        this.dispatchEvent(new CustomEvent("add-task", {detail: obj}));
    }

    render() {
        return html `
            <h3>Task Form</h3>
            <form class="box" @submit=${this.handleSubmit} id="form">
                <label for="taskName">Task Name</label>
                <input class="input" type="text" placeholder="Task Name" 
                .value="${this.todoItem?.taskName}" required name="taskName">
                <label for="taskName">Status</label>
                <input class="input" type="text" placeholder="Status"
                .value="${this.todoItem?.status}" required name="status">
                <label for="taskName">Task Type</label>
                <input class="input" type="text" placeholder="Task Type"
                .value="${this.todoItem?.taskType}" required name="taskType">
                <label for="taskName">Task ID</label>
                <input class="input" type="text" placeholder="Task ID"
                .value="${this.todoItem?.taskId}" required name="taskID">
                <label for="taskName">Priority</label>
                <input class="input" type="text" placeholder="Task Priority"
                .value="${this.todoItem?.taskPriority}" required name="priority">
                <button class="button is-primary" type="submit">Add Task</button>
            </form>
        `
    }
}
