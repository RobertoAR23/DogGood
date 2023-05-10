import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDescription, deleteDog } from '../../actions/index';
import { Link, useHistory } from 'react-router-dom';
import './Details.css';

export default function Detail(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const dogDescription = useSelector(state => state.dogDescription);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleDelete = () => {
    if (dogDescription.createdInBd) {
      dispatch(deleteDog(id))
        .then(() => {
          alert('Deleted successfully');
          history.push("/Home");
        })
        .catch(() => {
          alert('Failed to delete the dog');
        });
    } else {
      alert('This dog cant be deleted');
    }
  };
  

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
        <button id="back-btn" onClick={handleDelete}>Delete</button>
      </div>
      {isLoading && <img src="https://i.giphy.com/media/ar8zpFnzWcSbAxjJmd/giphy.webp" alt="loading" />}
      {!isLoading && (
        <>
          <h1 className="dog-name">{dogDescription.name}</h1>
          <div className="dog-info">
            <img className="dog-image" src={dogDescription.image} alt={dogDescription.name} />
            <ul>
              <li id='Details'>Height: {dogDescription.heightMin}-{dogDescription.heightMax} cm</li>
              <li id='Details'>Weight: {dogDescription.weightMin}-{dogDescription.weightMax} kg</li>
              <li id='Details'>Life span: {dogDescription.life_spanMin}-{dogDescription.life_spanMax} years</li>
              <li id='Details'>Temperament: {dogDescription.temperament}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}