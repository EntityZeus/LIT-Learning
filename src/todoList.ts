import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export type todoList = {
    taskName: string;
    status: string;
    taskType: string;
    taskId: string;
    taskPriority: string;
}

export class TodoList extends LitElement {
    static get styles(){
        return [
            css `
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
            .box{
                background-color: white;
                border-radius: 5px;
                box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
                color: #4a4a4a;
                display: block;
                padding: 1.25rem;
            }
            .table{
                width: 100%;
                padding: 0px 1.2rem 0.6rem;
                border-collapse: separate;
                border-spacing: 0px 4px;
                margin-bottom: 1.5rem !important;
                background-color: rgb(245, 248, 251);
                color: #a2a9ad;
            }
            .table thead{
                background-color: rgb(245, 248, 251);
            }
            .table thead th{
                text-align: left;
                border-width: 0px;
                color: #3b3e3f;
            }
            .table tbody{
                transform-style: preserve-3d;
                background-color: transparent;
            }
            .table tbody tr{
                border-radius: var(--table-row-border-radius);
                transition: box-shadow 0.25s ease 0s;
            }
            .table tbody tr td:first-child{    
                border-right: 0px;
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
            }
            .table tbody tr td {
                background-color: #fff;
            }
            .table td {
                height: 60px;
                border: 1px solid rgb(241, 245, 250);
                padding: 0.6rem 2.1rem;
            }
            `
        ]
    };
    @property({type: Array}) todoList: todoList[]=[];

    handleEdit(index: number){
        this.dispatchEvent(new CustomEvent('edit-item', {detail: {index: index}}))
    }
    handleDelete(index: number){
        this.todoList.splice(index, 1);
        this.dispatchEvent(new CustomEvent('update-list', {detail: this.todoList}));
    }

    render() {
        return html `
            <h3>Todo List</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Task Type</th>
                        <th>Task ID</th>
                        <th>Task Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.todoList.map((item: todoList, index: number)=>{
                        return html`
                        <tr>
                            <td>${item.taskName}</td>
                            <td>${item.taskType}</td>
                            <td>${item.taskId}</td>
                            <td>${item.taskPriority}</td>
                            <td>${item.status}</td>
                            <td>
                                <button class="button is-primary" @click=${()=>{this.handleEdit(index)}}>Edit</button>
                                <button class="button is-primary" @click=${()=>{this.handleDelete(index)}}>Delete</button>
                            </td>
                        </tr>`
                    })}
                </tbody>
            </table>
        `;
    }
}

customElements.define("todolist-element", TodoList);
declare global {
  interface HTMLElementTagNameMap {
    'todolist-element': TodoList;
  }
}