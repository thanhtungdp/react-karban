import React,{Component} from 'react';
import KarbanBoardContainer from './KarbanBoardContainer';
import {render} from 'react-dom';
import 'react-addons-update'

let cardList = [
    {
        id: 1,
        title: "Read the Book",
        description: "I should read the whole book",
        color:'#BD8d31',
        status: "in-progress",
        tasks: [
            {
                id: 1,
                name: "Title",
                done: false
            }
        ]
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)",
        status: "todo",
        color:'#3A7E28',
        tasks: [
            {
                id: 1,
                name: "ContactList Example",
                done: true
            },
            {
                id: 2,
                name: "Kanban Example",
                done: false
            },
            {
                id: 3,
                name: "My own experiments",
                done: false
            }
        ]
    }
]

render(<KarbanBoardContainer />, document.getElementById('root'))