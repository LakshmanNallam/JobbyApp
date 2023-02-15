import './index.css'

const SimilarJobCard = props => {
  const {eachItem} = props
  const data = {
    id: eachItem.id,
    LogoUrl: eachItem.company_logo_url,

    type: eachItem.employment_type,
    about: eachItem.job_description,
    location: eachItem.location,
    rating: eachItem.rating,
    title: eachItem.title,
  }
  return (
    <li className="JobCard SimilarConCard">
      <div className="CardFirstCon">
        <div className="CompanyLogoHolderCon">
          <img
            src={`${data.LogoUrl}`}
            className="ComponayLogo"
            alt="similar job company logo"
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
      </div>
      <hr className="hr" />
      <h1>Description</h1>
      <p>{data.about}</p>
      <h1>Skills</h1>
    </li>
  )
}

export default SimilarJobCard
