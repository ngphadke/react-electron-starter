import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

let root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

ReactDOM.render(
    <App title='Hello React!!' />,
    document.getElementById('root')
)

// module.hot.accept()
