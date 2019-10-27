import React from 'react';

const Result = ({ result, error }) => {

  const resultAsList = (result) => {
    if (result === null) return null;
    return Object.keys(result).map((property, index) => {
      if (!result[property]) {
        return (
          <li key={index}><span className="category">{`${property}`}</span> : {`''`}</li>
        )
      }
      if (typeof result[property] !== 'string') {
        return (
          <li key={index}>
            <span className="category">{`${property}`} : </span>
            <ul key={index}>
              {resultAsList(result[property])}
            </ul>
          </li>
        );
      }
      return (
        <li key={index}><span className="category">{`${property}`}</span> : {`${result[property]}`}</li>
      );
    });
  }

  if (!error) {
    if (!result) return <p className="title">Yaml Viewer!</p>;
    return (
      <div className="resultList">
        <ul>{resultAsList(result)}</ul>
      </div>
    )
  } else {
    return (
      <>
        <p className="status">{error.response.status}</p>
        <p>{error.response.data} </p>
      </>
    )
  }

}

export default Result;