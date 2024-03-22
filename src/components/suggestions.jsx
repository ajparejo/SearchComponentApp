/* eslint-disable react/prop-types */

export const Suggestions = ({ data }) => {
  return (
    <ul>
        {
            data && data.length
            ? data.map((item, index) => <li key={index}>{item}</li>)
            : null
        }
    </ul>
  )
}
