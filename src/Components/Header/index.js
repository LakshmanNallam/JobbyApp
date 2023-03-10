import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {AiOutlineHome} from 'react-icons/ai'
import {FaWpforms} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

class Header extends Component {
  LogoutButtonCliked = () => {
    console.log(this.props)
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="HeaderCom">
        <div className="LogoConHolder">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </div>
        <div className="MiddleCon">
          <p>
            <Link to="/" className="home">
              Home
            </Link>
          </p>
          <p>
            <Link to="/jobs" className="home">
              Jobs
            </Link>
          </p>
        </div>
        <div className="btnCon">
          <button
            type="button"
            className="LogoUtBtn"
            onClick={this.LogoutButtonCliked}
          >
            LogOut
          </button>
        </div>
        <div className="SmHoLgCon">
          <Link to="/">
            <AiOutlineHome className="ColorWhite" />
          </Link>

          <Link to="/jobs">
            <FaWpforms className="ColorWhite" />
          </Link>

          <li onClick={this.LogoutButtonCliked}>
            <FiLogOut className="ColorWhite" />
          </li>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
