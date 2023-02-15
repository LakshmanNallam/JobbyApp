import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', loginFailed: false, errorMsg: ''}

  SubmitBtnCliked = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    if (response.ok) {
      this.setState({loginFailed: false})
      const data = await response.json()
      console.log(data)
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      console.log(response)
      const data = await response.json()
      console.log(data)
      this.setState({loginFailed: true, errorMsg: data.error_msg})
    }
  }

  usernameChanged = event => {
    this.setState({username: event.target.value})
  }

  passwordChanged = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, loginFailed, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="LowerConInLogin">
          <form className="FormCon" onSubmit={this.SubmitBtnCliked}>
            <div className="FirstConInForm">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
                className="logo"
                alt="website logo"
              />
            </div>
            <div className="SecondConInForm">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="input"
                className="inpu"
                value={username}
                onChange={this.usernameChanged}
              />
            </div>
            <div className="SecondConInForm">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="inpu"
                value={password}
                onChange={this.passwordChanged}
              />
            </div>

            <button type="submit" className="btn">
              Login
            </button>

            {loginFailed && <p className="p">{errorMsg}</p>}
          </form>
        </div>
      </>
    )
  }
}

export default Login
