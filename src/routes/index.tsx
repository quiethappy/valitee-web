import React from 'react'
import { Route, Routes } from '../router'

import Home from './Home'
import Game from './Game'
import NotFound from './NotFound'


class Route2 extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
  }
}

export default Route2

