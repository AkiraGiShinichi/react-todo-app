import React from "react"
import TodosList from "./TodosList";
import Header from "./Header"
import InputTodo from "./InputTodo"
import { v4 as uuidv4} from "uuid"
import axios from "axios"

class TodoContainer extends React.Component {
    state = {
        todos: [],
        show: false
       };

    handleChange = (id) => {
        // console.log("clicked", id);
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            }),
            show: !this.state.show
        })
    }

    deleteTodo = id => {
        // console.log("deleted", id);
        // this.setState({
        //     todos: [
        //         ...this.state.todos.filter(todo => {
        //             return todo.id !== id;
        //         })
        //     ]
        // })
        axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => this.setState({
            todos: [
                ...this.state.todos.filter(todo => {
                    return todo.id != id
                }),
            ],
        }))
    }

    addTodoItem = title => {
        // console.log(title);
        // const newTodo = {
        //     id: uuidv4(),
        //     title: title,
        //     completed: false
        // };
        // this.setState({
        //     todos: [ ...this.state.todos, newTodo ]
        // });
        axios
        .post("https://jsonplaceholder.typicode.com/todos", {
            title: title,
            completed: false
        })
        .then(response => this.setState({
            todos: [...this.state.todos, response.data]
        }))
    }

    componentDidMount() {
        // axios.get("https://jsonplaceholder.typicode.com/todos", {
        //     params: {
        //         _limit: 10
        //     }
        // })
        // .then(response => console.log(response.data));
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
        .then(response => this.setState({ todos: response.data }));
    }

    render() {
        return (
            <div className="container">
                {/* <h1>Hello from React</h1>
                <p>I am a component</p>
                <input type="checkbox" checked="{true}" /> */}

                {/* {this.state.todos.map(todo => (
                    <li>{todo.title}</li>
                ))} */}

                <Header headerSpan={this.state.show} />
                <InputTodo addTodoProps={this.addTodoItem} />
                <TodosList
                    todos={this.state.todos}
                    handleChangeProps={this.handleChange}
                    deleteTodoProps={this.deleteTodo}
                />
            </div>
        )
    }
}


export default TodoContainer