import React, { Component } from 'react';
import { ReactDOM } from "react-dom";
import { Link } from 'react-router-dom';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tasks: []
        };
        //bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleSubmit(e) {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();
        axios
            .post('/tasks', {
                name: this.state.name
            })
            .then(response => {
                console.log('from handle submit', response);

                this.setState({
                    tasks: [response.data, ...this.state.tasks]
                });

                this.setState({
                    name: ''
                });
            });
    }

    renderTasks() {

        return this.state.tasks.map((data) =>  {

            return(
                <div className="row pt-2">
                    <div className="col-sm-5 col-md-5 col-lg-5">
                        <div className="card">
                            <div className="card-header">
                                <p>Created: {data.created_at}</p>
                            </div>
                            <div className="card-body">
                                <p>User name: {data.user.name}</p>
                                <p>Post: {data.name}</p>
                            </div>
                            <div className="card-footer">
                                <div className="left">
                                    <Link className="btn btn-sm btn-success" to={`/${data.id}/edit`}>Edit</Link>
                                    <button onClick={() => this.handleDelete(data.id)} className="btn btn-sm btn-danger float-right">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            )
        })

    }

    /*return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <p>
                        {task.name}{' '}
                        <span className="text-muted">
                            { ' ' }
                            <br />by {task.user.name} {' '}
                            {task.updated_at
                                .split(' ')
                                .slice(1)
                                .join(' ')}                        
                        </span>
                        <div className="form-group float-right">
                            <Link className="btn btn-sm btn-success" to={`/${task.id}/edit`}>Edit</Link>
                            <button onClick={() => this.handleDelete(task.id)} className="btn btn-sm btn-warning float-right">Delete</button>
                        </div>
                    </p>
                </div>
            </div>*/
    
    //get all tasks from backend
    getTasks() {
        axios.get('/tasks').then((
            response // console.log(response.data.tasks)
        ) =>
            this.setState({
                tasks: [...response.data.tasks]
            })
        );
    }
    // lifecycle method
    componentWillMount() {
        this.getTasks();
    }

    //handle delete
    handleDelete(id) {
        //remote from local state
        const isNotId = task => task.id !== id;
        const updatedTasks = this.state.tasks.filter(isNotId);
        this.setState({ tasks: updatedTasks });
        //make delete request to the backend
        axios.delete(`/tasks/${id}`);
    }

    //handle change
    handleChange(e) {
        this.setState({
            name: e.target.value
        });
        console.log('onChange', this.state.name);
    }

    //handle update
    handleUpdate(id) {
        axios.put(`/tasks/${id}`).then(response => {
            this.getTasks();
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row pt-4"> 
                    <div className="col-md-12 col-lg-12 col-sm-12">
                         <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>New Post</label>
                                <textarea class="form-control" onChange={this.handleChange} value={this.state.name} maxLength="255" rows="3" placeholder="Create a new task" required/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Create Post</button>
                            </div>
                         </form>
                    </div>
                </div>
                <div className="form-group">
                    <h2>Posts</h2>
                    {this.renderTasks()}
                </div>
            </div>
        );
    }
}
