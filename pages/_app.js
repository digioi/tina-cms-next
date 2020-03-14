import React from 'react'
import App from 'next/app'
import { Tina, TinaCMS } from 'tinacms'

class TinaCmsApp extends App {
  constructor() {
    super()
    this.cms = new TinaCMS()
  }
  render() {
    const { Component, pageProps } = this.props
    return <Tina cms={this.cms}>
      <Component {...pageProps} />
    </Tina>
  }
}

export default TinaCmsApp