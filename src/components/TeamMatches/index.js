import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {isLoading: true, teamMatchData: []}

  componentDidMount() {
    this.getTeamMatchData()
  }

  getTeamMatchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        id: data.latest_match_details.id,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        date: data.latest_match_details.date,
        firstInnings: data.latest_match_details.first_innings,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        matchStatus: data.latest_match_details.match_status,
        result: data.latest_match_details.result,
        secondInnings: data.latest_match_details.second_innings,
        umpires: data.latest_match_details.umpires,
        venue: data.latest_match_details.venue,
      },
      recentMatches: data.recent_matches.map(recentMatch => ({
        umpires: recentMatch.umpires,
        result: recentMatch.result,
        manOfTheMatch: recentMatch.man_of_the_match,
        id: recentMatch.id,
        date: recentMatch.date,
        venue: recentMatch.venue,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.competing_team_logo,
        firstInnings: recentMatch.first_innings,
        secondInnings: recentMatch.second_innings,
        matchStatus: recentMatch.match_status,
      })),
    }

    this.setState({teamMatchData: formattedData, isLoading: false})
  }

  displayTeamMatches = () => {
    const {teamMatchData} = this.state
    const {teamBannerUrl, latestMatchDetails} = teamMatchData

    return (
      <div className="banner-page-container">
        <img src={teamBannerUrl} alt="team banner" className="logo-banner" />
        <LatestMatch latestMatch={latestMatchDetails} />
        {this.displayRecentMatches()}
      </div>
    )
  }

  displayRecentMatches = () => {
    const {teamMatchData} = this.state
    const {recentMatches} = teamMatchData
    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachMatch => (
          <MatchCard key={eachMatch.id} matchData={eachMatch} />
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
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className={`team-matches-bg-container ${id}`}>
        {isLoading ? this.displayLoader() : this.displayTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
