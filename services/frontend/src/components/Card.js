import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card({ image }) {
  const [detectImage, toggleDetectImage] = useState(true);

  return (
    <div className="column" style={{textAlign: 'left'}}>
      <div className="ui card" style={{margin: 'auto'}}>
        <Link to={`/images/${ image.name.replace('.jpg', '') }`} className='ui image'>
          <img
            src={`${process.env.REACT_APP_API_URL}/api/${detectImage ? 'detects': 'uploads'}/${image.name}`}
            alt="Some image here"
          />
        </Link>
        <div className="content">
          <div style={{marginBottom: '5px'}}>
            <i
              className="clone icon"
              style={detectImage ? {color: '#33ff33'} : {}}
              onClick={() => toggleDetectImage(!detectImage)}>
            </i>
            <i className="hand point up outline icon"></i>
          </div>
          <div className="description">This image may contain: {image.boxes.length > 0 ?
            [...new Set(image.boxes.map(box => box.label))].map((label, id) => (
              <div key={ id } className='ui label' style={{background: '#11ee66'}}>{ label }</div>
            )) :
            <div className='ui label'>nothing</div>}
          </div>
        </div>
        <div className="extra content">
          <div>Uploaded by <span style={{color: 'red'}}>{ image.user.username }</span> at { image.uploaded_at }</div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.object.isRequired
}

export default Card;