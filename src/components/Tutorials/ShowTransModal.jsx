import React from 'react';
import parse from 'html-react-parser';

export default function ShowTranscriptModal(props) {
  return (
    <div>
      {props?.maindata?.trans_script
        ? parse(props?.maindata?.trans_script)
        : ''}
      <hr />
    </div>
  );
}
