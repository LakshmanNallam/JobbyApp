import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Filters from '../Filters'
import Header from '../Header'
import './index.css'

const StateObj = {
  initial: 'DFJSKNDF',
  loading: 'sdfdv',
  success: 'sdbjhf',
  failure: 'sdfbjkdv',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    CurrentProfileStatus: StateObj.initial,
    CurrentSituation: StateObj.initial,
    userDetails: [],
    employmanetTypeList: [],
    salarySelected: 0,
    JobsList: [],
    inputVal: '',
    emptyList: false,
  }

  componentDidMount() {
    this.getUserProfileDetails()
    this.getJobsList()
  }

  getJobsList = async () => {
    const {salarySelected, employmanetTypeList, inputVal} = this.state
    this.setState({CurrentSituation: StateObj.loading})
    console.log(inputVal)
    const jobType = employmanetTypeList.join()
    const token = Cookies.get('jwt_toke')
    const options = {headers: {Authorization: `Bearer ${token}`}, method: 'GET'}

    const response2 = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${jobType}&minimum_package=${salarySelected}&search=${inputVal}`,
      options,
    )
    console.log(response2)
    if (response2.ok) {
      const data = await response2.json()
      console.log(data)
      if (data.jobs.length === 0) {
        this.setState({emptyList: true, CurrentSituation: StateObj.success})
      } else {
        this.setState({
          CurrentSituation: StateObj.success,
          JobsList: data,
          emptyList: false,
        })
      }
    } else if (response2.status === 401) {
      this.setState({CurrentSituation: StateObj.failure})
    }
  }

  getUserProfileDetails = async () => {
    this.setState({
      CurrentProfileStatus: StateObj.loading,
    })
    const token = Cookies.get('jwt_token')
    const options = {headers: {Authorization: `Bearer ${token}`}, method: 'GET'}
    const response = await fetch('https://apis.ccbp.in/profile', options)

    if (response.ok) {
      let data = await response.json()
      data = data.profile_details
      const ModData = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }

      this.setState({
        CurrentProfileStatus: StateObj.success,
        userDetails: ModData,
      })
    } else {
      this.setState({CurrentProfileStatus: StateObj.failure})
    }
  }

  renderJobsList = () => {
    const {CurrentSituation, JobsList, emptyList} = this.state
    const {jobs} = JobsList

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
        return emptyList ? (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </>
        ) : (
          jobs.map(eachItem => {
            const data = {
              id: eachItem.id,
              url: eachItem.company_logo_url,
              type: eachItem.employment_type,
              about: eachItem.job_description,
              location: eachItem.location,
              salary: eachItem.package_per_annum,
              rating: eachItem.rating,
              title: eachItem.title,
            }
            return (
              <Link to={`/jobs/${data.id}`} className="Link" key={data.id}>
                <li className="JobCard">
                  <div className="CardFirstCon">
                    <div className="CompanyLogoHolderCon">
                      <img
                        src={`${data.url}`}
                        className="ComponayLogo"
                        alt="company logo"
                      />
                    </div>
                    <div className="rightConInCard">
                      <h1>{data.title}</h1>
                      <p>{data.rating}</p>
                    </div>
                  </div>
                  <div className="CardSecondCon">
                    <div className="LocatipnCon">
                      <p className="location">{data.location}</p>
                      <p>{data.type}</p>
                    </div>
                    <p>{data.salary}</p>
                  </div>
                  <hr className="hr" />
                  <h1>Description</h1>
                  <p>{data.about}</p>
                </li>
              </Link>
            )
          })
        )

      case StateObj.failure:
        return (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" onClick={this.getJobsList}>
              Retry
            </button>
          </>
        )
      default:
        return null
    }
  }

  renderTheDetails = () => {
    const {CurrentProfileStatus, userDetails} = this.state
    switch (CurrentProfileStatus) {
      case StateObj.initial:
        return null
      case StateObj.loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case StateObj.success:
        return (
          <div className="ProfileImgCon">
            <div className="avatarConHolder">
              <img
                src={`${userDetails.profileImageUrl}`}
                className="avatarr"
                alt="profile"
              />
            </div>
            <h1 className="h11">{userDetails.name}</h1>
            <p>{userDetails.shortBio}</p>
          </div>
        )
      default:
        return <button type="button">Retry</button>
    }
  }

  listChanged = employementId => {
    const {employmanetTypeList} = this.state
    if (!employmanetTypeList.includes(employementId)) {
      this.setState(
        prevState => ({
          employmanetTypeList: [
            ...prevState.employmanetTypeList,
            employementId,
          ],
        }),
        this.getJobsList,
      )
    } else {
      const neww = employmanetTypeList.filter(
        eachItem => eachItem !== employementId,
      )
      this.setState({employmanetTypeList: neww}, this.getJobsList)
    }
  }

  salaryChanged = value => {
    this.setState({salarySelected: value}, this.getJobsList)
  }

  InputChanged = event => {
    this.setState({inputVal: event.target.value})
  }

  SearchBtnClicked = () => {
    this.getJobsList()
  }

  render() {
    const {inputVal} = this.state

    return (
      <div className="BgBlack">
        <Header />
        <div className="LowerConInJobs">
          <div className="LeftConInJobs">
            {this.renderTheDetails()}
            <hr />
            <Filters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              listChanged={this.listChanged}
              salaryChanged={this.salaryChanged}
            />
          </div>

          <div className="RightConInJobs">
            <div className="searchInputCon">
              <input
                value={inputVal}
                type="search"
                className="searchInpu"
                placeholder="Search"
                onChange={this.InputChanged}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.SearchBtnClicked}
              >
                <BsSearch className="SearchImgIMported" />
              </button>
            </div>
            <ul className="UlCon">{this.renderJobsList()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
