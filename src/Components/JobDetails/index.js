import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'

import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const StateObj = {
  initial: 'DFJSKNDF',
  loading: 'sdfdv',
  success: 'sdbjhf',
  failure: 'sdfbjkdv',
}

class JobDetails extends Component {
  state = {CurrentSituation: StateObj.initial, dataRe: null}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({CurrentSituation: StateObj.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {headers: {Authorization: `Bearer ${token}`}, method: 'GET'}
    const response = await fetch(url, options)
    if (response.ok) {
      const dataRe = await response.json()

      this.setState({CurrentSituation: StateObj.success, dataRe})
    } else {
      this.setState({CurrentSituation: StateObj.failure})
    }
  }

  renderSuccesDetails = () => {
    const {dataRe} = this.state
    const jobDetails = dataRe.job_details
    const SimilarJobsList = dataRe.similar_jobs

    const {skills} = jobDetails
    const life = jobDetails.life_at_company
    const {description} = life
    const imageUrlLg = life.image_url
    console.log(skills)
    console.log(dataRe)
    const data = {
      id: jobDetails.id,
      LogoUrl: jobDetails.company_logo_url,
      webUrl: jobDetails.company_website_url,
      type: jobDetails.employment_type,
      about: jobDetails.job_description,
      location: jobDetails.location,
      salary: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
    }
    return (
      <>
        <li className="JobCard">
          <div className="CardFirstCon">
            <div className="CompanyLogoHolderCon">
              <img
                src={`${data.LogoUrl}`}
                className="ComponayLogo"
                alt="job details company logo"
              />
            </div>
            <div className="rightConInCard">
              <h1>{data.title}</h1>
              <div className="row">
                <BsStarFill className="star" />
                <p>{data.rating}</p>
              </div>
            </div>
          </div>
          <div className="CardSecondCon">
            <div className="LocatipnCon">
              <MdLocationOn />
              <p className="location">{data.location}</p>
              <BsFillBriefcaseFill />
              <p>{data.type}</p>
            </div>
            <p>{data.salary}</p>
          </div>
          <hr className="hr" />
          <h1>Description</h1>
          <h1>
            <a href={data.webUrl}>
              Visit
              <BiLinkExternal />
            </a>
          </h1>
          <p>{data.about}</p>
          <h1>Skills</h1>
          <div className="ConForSkills">
            {skills.map(eachItem => (
              <div className="SkillCon">
                <li className="SkillConImgHolder" key={eachItem.name}>
                  <img
                    src={`${eachItem.image_url}`}
                    className="skillLogo"
                    alt={eachItem.name}
                  />
                </li>
                <p>{eachItem.name}</p>
              </div>
            ))}
          </div>
          <div className="DesConLarge">
            <div className="Con1INdes">
              <h1>Life at Company</h1>
              <p className="jjdsf">{description}</p>
            </div>
            <div className="DESCIMGCONHOLD">
              <img
                src={`${imageUrlLg}`}
                className="skillLogo"
                alt="life at company"
              />
            </div>
          </div>
        </li>
        <h1>Similar Jobs</h1>
        <ul className="SimilarJobScON">
          {SimilarJobsList.map(eachItem => (
            <SimilarJobCard eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderCurrentSituationDetails = () => {
    const {CurrentSituation} = this.state

    switch (CurrentSituation) {
      case StateObj.initial:
        return null
      case StateObj.loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case StateObj.success:
        return this.renderSuccesDetails()
      case StateObj.failure:
        return (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" onClick={this.getJobDetails}>
              Retry
            </button>
          </>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="MainDivInDetails">
        <Header />
        <ul className="LowerConInDetails">
          {' '}
          {this.renderCurrentSituationDetails()}
        </ul>
      </div>
    )
  }
}

export default JobDetails
