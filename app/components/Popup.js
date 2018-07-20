import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTv } from '@fortawesome/free-solid-svg-icons'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { CF_FRONT_URL } from '../lib/constants'
import Settings from './Settings'

import styles from './Popup.css'
import tabsStyles from './Tabs.css'
import translate from '../lib/translate'



export default class Popup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {url: null}
  }

  componentDidMount() {
    chrome.tabs.query({active: true, currentWindow: true}, arrayOfTabs => {
      this.setState({url: arrayOfTabs[0].url})
    })
  }

  render() {
    return (
      <div className={styles.popup}>
        <img src={chrome.runtime.getURL('img/banner.jpg')} className={styles.banner} alt=""/> 
        {this.renderActions()}
        <Tabs 
          defaultIndex={0}
          selectedTabClassName={tabsStyles.isActive}
          selectedTabPanelClassName={tabsStyles.panelActive}
        >
          <TabList className={tabsStyles.tabsList}>
            <Tab>
              <a>
                <FontAwesomeIcon icon={faTv}/>
                <span>{translate('videos')}</span>
              </a>
            </Tab>
            <Tab>
              <a>
                <FontAwesomeIcon icon={faCog}/>
                <span>{translate('settings')}</span>
              </a>
            </Tab>
          </TabList>
          <TabPanel/>
          <TabPanel>
            <div className={styles.content}>
              <Settings/>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  renderActions() {
    const { url } = this.state
    if (!url || !url.match(/^(http:\/\/|https:\/\/)?(www\.)?youtube\.com\/watch\?*/))
      return null

    const cfUrl = `${CF_FRONT_URL}/videos/add?url=${encodeURIComponent(url)}`
    return (
      <div className={styles.actionsBlockContainer}>
        <a className={styles.actionsBlock} target="_BLANK" href={cfUrl}>
          <img src={chrome.runtime.getURL('img/new_tab.png')} alt=""/>
          {translate("openOnCF")}
        </a>
      </div>
    )
  }
}
