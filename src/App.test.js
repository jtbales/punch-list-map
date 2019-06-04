import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
// import PunchList from './PunchList';
import ExampleData from "./Api/ExampleData";
import BBAppBar from "./BBAppBar"

// I would test the most active component, PunchList
// but there is a lot of mocking work arounds needed for mapbox that i don't have time for

// I would also use jest IRL, but did this just as a quick test


const exampleData = [
    {
        "discipline": "plumbing",
        "state": "in-progress"
    },
    {
        "discipline": "fire-protection",
        "state": "completed"
    },
    {
        "discipline": "fire-protection",
        "state": "in-progress"
    },
    {
        "discipline": "plumbing",
        "state": "completed"
    },
]
it('ExampleData.PunchList.Work.getAll', () => {
    expect(ExampleData.PunchList.Work.getAll({}, exampleData).length).toBe(exampleData.length);
    expect(ExampleData.PunchList.Work.getAll({ discipline: "plumbing", state: "completed" }, exampleData)[0]).toBe(exampleData[3]);
});


let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

// Forgive me, the App bar doesn't have any real funcationality and I'm already over time
it('BBAppBar', () => {
    // Test first render and componentDidMount
    act(() => {
        ReactDOM.render(<BBAppBar />, container);
    });
    const search = container.querySelector('input');
    expect(search.placeholder).toBe('Search...');
});






