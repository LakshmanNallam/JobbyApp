import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  FindJobsClicked = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <div className="HomeMainCon">
        <Header />
        <div className="LowerConInHome">
          <div className="ContentInHome">
            <h1>Find The Job That Fits Your Life</h1>
            <p>
              Millions of people are searching for jobs,salary information,
              company reviews.Find the job that fits your abilites
            </p>
            <div>
              <button
                type="button"
                className="btn"
                onClick={this.FindJobsClicked}
              >
                <Link to="/jobs">Find Jobs</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
