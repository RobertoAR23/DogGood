import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDescription } from '../../actions/index';
import { Link } from 'react-router-dom';

function Detail(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const dogDescription = useSelector(state => state.dogDescription);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getDescription(id))
      .then(() => setIsLoading(false));
  }, [dispatch, id]);

  return (
    <div className="detail">
      <div className="button-container">
        <Link to="/Home">
          <button id="back-btn">Home</button>
        </Link>
      </div>
      {isLoading && <img src="https://i.giphy.com/media/ar8zpFnzWcSbAxjJmd/giphy.webp" alt="loading" />}
      {!isLoading && (
        <>
          <h1>{dogDescription.name}</h1>
          <img src={dogDescription.image} alt={dogDescription.name} />
          <ul>
            <li>Height: {dogDescription.heightMin}-{dogDescription.heightMax} cm</li>
            <li>Weight: {dogDescription.weightMin}-{dogDescription.weightMax} kg</li>
            <li>Life span: {dogDescription.life_spanMin}-{dogDescription.life_spanMax} years</li>
            <li>Temperament: {dogDescription.temperament}</li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Detail;
