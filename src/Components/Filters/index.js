import './index.css'

const Filters = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    listChanged,
    salaryChanged,
  } = props
  return (
    <>
      <h1>Type of Employment</h1>
      <ul>
        {employmentTypesList.map(eachItem => {
          const listChangedCall = event => {
            listChanged(event.target.value)
          }

          return (
            <li key={eachItem.employmentTypeId} onChange={listChangedCall}>
              <input
                type="checkbox"
                value={eachItem.employmentTypeId}
                id={eachItem.employmentTypeId}
              />
              <label htmlFor={eachItem.employmentTypeId}>
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
      <hr />
      <h1>Salary Range</h1>
      <ul>
        {salaryRangesList.map(eachItem => {
          const salaryChangedCall = event => {
            salaryChanged(event.target.value)
          }
          return (
            <li key={eachItem.salaryRangeId} onClick={salaryChangedCall}>
              <input
                type="radio"
                value={eachItem.salaryRangeId}
                id={eachItem.salaryRangeId}
                name="dummy"
              />
              <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Filters
