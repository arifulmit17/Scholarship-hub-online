import React from 'react';

const ApplicationRow = ({app}) => {
    const {userName,applicationStatus,degree,hscResult,sscResult,studyGap}=app
    return (
        <div>
            <>
    <tr>
        <td>{userName}</td>
        <td>{applicationStatus}</td>
        <td>{degree}</td>
        <td>{hscResult}</td>
        <td>{sscResult}</td>
        <td>{studyGap}</td>
      </tr>
        </>
        </div>
    );
};

export default ApplicationRow;