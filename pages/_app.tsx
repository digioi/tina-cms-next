import React from 'react'
import App from 'next/app'
import { Tina, TinaCMS } from 'tinacms'
import { GitClient, GitMediaStore } from '@tinacms/git-client'
import { BrowserStorageApi } from "../utils/BrowserStorageApi"

const tinaConfig = {
  apis: {
    git: new GitClient('http://localhost:3000/api/___tina'),
    storage:
      typeof window !== 'undefined'
        ? new BrowserStorageApi(window.localStorage)
        : {},
  },

  sidebar: {
    hidden: process.env.NODE_ENV === "production",
    position: 'displace' as any,
  },
}

class TinaCmsApp extends App {
  cms: any;
  constructor(props) {
    super(props)
    this.cms = new TinaCMS(tinaConfig)
    const client = new GitClient('http://localhost:3000/api/___tina')
    this.cms.registerApi('git', client)
    this.cms.media.store = new GitMediaStore(client)
  }
  render() {
    const { Component, pageProps } = this.props
    return <Tina cms={this.cms} {...tinaConfig.sidebar}>
      <Component {...pageProps} />
    </Tina>
  }
}

export default TinaCmsApp