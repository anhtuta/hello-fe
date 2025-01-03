import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import './App.css';

const App = () => (
    <div className="div_wrapper">
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
)

export default App