import React from 'react'
import Editor from './editor/Editor'

export default function App(){
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Hermes — Editor (dev)</h1>
      </header>
      <main>
        <Editor />
      </main>
    </div>
  )
}
