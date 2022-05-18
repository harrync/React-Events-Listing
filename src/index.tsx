import React from 'react'
import ReactDOM from 'react-dom'
import WhatsOn from './components/WhatsOnInit'
import './styles.scss'

const root = document.getElementById('root')

if (root) {
  // const noResults = root.dataset.noresults;
  const noResults = 'Sorry, no results available' as string

  ReactDOM.render(
    <React.StrictMode>
      <WhatsOn noResultsCopy={noResults} />
    </React.StrictMode>,
    root
  )
}
