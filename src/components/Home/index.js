import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {isLoading: true, teamsData: []}

  componentDidMount() {
    this.getIplTeamsData()
  }

  getIplTeamsData = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    // formatting the data from snake case to camel case
    const formattedData = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))
    console.log(formattedData)
    this.setState({teamsData: formattedData, isLoading: false})
  }

  displayTeams = () => {
    const {teamsData} = this.state
    return (
      <ul className="list-of-teams-container">
        {teamsData.map(eachTeam => (
          <TeamCard key={eachTeam.id} eachTeam={eachTeam} />
        ))}
      </ul>
    )
  }

  displayLoader = () => (
    /* <div testid="loader"> */
    <Loader type="Oval" color="#ffffff" height={50} width={50} />
    /* </div> */
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="ipl-dashboard-container">
        <div className="logo-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            className="logo"
            alt="ipl logo"
          />
          <h1 className="heading">IPL Dashboard</h1>
        </div>
        <div className="teams-container">
          {isLoading ? this.displayLoader() : this.displayTeams()}
        </div>
      </div>
    )
  }
}

export default Home
