import React, { Component } from 'react'

import FreestarAdSlot from '@freestar/pubfig-adslot-react-component'

const homes_placement_names = [
    'homes_Liner1',
    'homes_Liner2',
    'homes_Liner3',
    'homes_Liner1Mobile',
    'homes_Liner2Mobile',
    'homes_Liner3Mobile',
    'homes_Liner1Tall',
    'homes_Liner2Tall',
    'homes_Liner3Tall',
    'homes_RightText',
    'homes_StickyText',
    'homes_Middle',
    'homes_Bottom',
    'homes_BottomSizeS',
    'homes_BottomMobile',
    'homes_FinalSlide',
    'homes_FinalSlideGrid',
    'homes_LeftText',
    'homes_TextButton',
    'homes_PriceText'
];

class Demo extends Component {
  state = {
    adRefreshCount: 0,
    adUnits: []
  }

  componentDidMount () {
    if (window.freestar) {
      const adUnits = homes_placement_names.map(name => {
        return {
          placementName: name,
          slotId: name,
          // targeting: ['value1', 'value2'] // optionally pass specific targeting
        };
      });
      this.setState({ adUnits })
    }

    // example of automatically refreshing an ad every 30 seconds a total of 5 times
    this.createAutoRefresh();
  }

  createAutoRefresh = () => {
    const interval = setInterval(() => {
      const maxRefreshes = 5
      this.setState({
        adRefreshCount: this.state.adRefreshCount + 1
      }, () => {
        const { adRefreshCount } = this.state
        if (adRefreshCount === maxRefreshes) {
          clearInterval(interval)
        }
      })
    }, 30000)
  }

  generateAdSlots = () => {
    console.log('this.state.adUnits', this.state.adUnits);
    const { adRefreshCount, adUnits } = this.state
    return adUnits.map(adUnit => (
      <div key={adUnit.name}>
          freestar ad slot for {adUnit.placementName}
        <FreestarAdSlot
          adUnit={adUnit}
          channel='homes'
          classList={['m-30', 'p-15', 'b-thin-red']}
          adRefresh={adRefreshCount}
          onNewAdSlotsHook={(placementName) => console.log('freestar.newAdSlots() was called', {placementName})}
          onDeleteAdSlotsHook={(placementName) => console.log('freestar.deleteAdSlots() was called', {placementName})}
          onAdRefreshHook={(placementName) => console.log('adRefresh was called', {placementName})}
        />
      </div>
    ))
  }

  // example of manually refreshing an ad
  onAdRefresh = () => {
    const { adRefreshCount } = this.state
    this.setState({
      adRefreshCount: adRefreshCount + 1
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.onAdRefresh}>Refresh All Ads</button>
        {this.generateAdSlots()}
      </div>
    )
  }
}

export default Demo