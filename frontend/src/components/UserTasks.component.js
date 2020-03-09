import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

class UserTasks extends Component {
    state = {
        tasks: [
            { id: uuidv4(), name: "Create a user story" },
            { id: uuidv4(), name: "Timebox the user story" },
            { id: uuidv4(), name: "Complete the user story" },
            { id: uuidv4(), name: "Review the result" }            
        ]
    }

    render() {
        const { tasks } = this.state;
        return (
            <Container>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={() => {
                        const name = prompt('Enter task');
                        if(name) {
                            this.setState(state => ({
                                tasks: [...state.tasks, { id: uuidv4(), name }]
                            }))
                        }
                    }}>Add Task</Button>
                
                <ListGroup>
                    <TransitionGroup className="User-Tasks">
                        { tasks.map(({ id, name }) => (
                            <CSSTransition key={ id } timeout={ 500 } classNames="fade">
                                <ListGroupItem>
                                    <Button
                                    className="remove-btn"
                                    color="danger" size="sm"
                                    onClick={() => {
                                        this.setState(state => ({
                                            tasks: state.tasks.filter(task => task.id !== id)
                                        }));
                                    }}>&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

export default UserTasks;