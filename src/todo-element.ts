import {html, css, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import type { todoList } from './todoList';
import './todoList';
import './todo-form';

@customElement('todo-element')
export class TodoElement extends LitElement {
    static get styles() {
        return [
            css`
                .box{
                    background-color: white;
                    border-radius: 5px;
                    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
                    color: #4a4a4a;
                    display: block;
                    padding: 1.25rem;
                }
                .section{
                    display: block;
                }
            `
        ]
    }
    @property({type: Array}) todoList: todoList[] = [];
    @state() todoItem: todoList = {
        taskName: "",
        status: "",
        taskType: "",
        taskId: "",
        taskPriority: ""
    };

    constructor() {
        super();
        this.todoList = [
            {
                taskName: "Task1",
                status: "Not started",
                taskType: "Personal",
                taskId: "1",
                taskPriority: "High"
            },
            {
                taskName: "Task2",
                status: "In Progress",
                taskType: "Work",
                taskId: "2",
                taskPriority: "Medium"
            },
            {
                taskName: "Task3",
                status: "Completed",
                taskType: "Personal",
                taskId: "3",
                taskPriority: "Low"
            }
        ]
    }

    handleUpdateList(event: CustomEvent) {
        this.todoList = [...event.detail];
    }
    handleTaskAdded(event: CustomEvent){
        this.todoList = [event.detail, ...this.todoList];
    }
    handleEditItem(event: CustomEvent){
        this.todoItem = this.todoList[event.detail.index];
        this.todoList.splice(event.detail.index, 1);
        this.todoList = [...this.todoList];
    }

    render() {
        return html`
        <div class="box">
            <h1>Todo Application</h1>
            <div class="section">
                <todolist-element .todoList=${this.todoList} 
                @update-list=${this.handleUpdateList}
                @edit-item=${this.handleEditItem}></todolist-element>
                <todoform-element .todoItem=${this.todoItem}
                @add-task=${this.handleTaskAdded}></todoform-element>
            </div>
        </div>
        `
    }
}