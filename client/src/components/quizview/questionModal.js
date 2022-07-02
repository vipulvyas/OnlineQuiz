import "./QiuzView.scss";

function questionModal(props){

  function prevIndexChangeHandler() {
    props.onIndexChange('prev');
  }
  console.log(props.quize)
  function nextIndexChangeHandler() {
    props.onIndexChange('next')
  }

  return (
    <>
    <h5>{props.quize.question}</h5>
      <div
        className="answer_sec"
        onChange={props.setUserSelectedAnswer}
      >
      {props.quize.answers.map((item, index) => {
        const isSelected = item === props.quize.userSelected;
        return (
          <div className="answers" key={index}>
            <input type="radio" name={props.quize.question} id={props.quize._id} value={item} checked={isSelected} />
              {item}
            </div>
          )})}
        </div>

    <div>
      <button className="prevButton" onClick={prevIndexChangeHandler}>
          Prev
      </button>
      <button className="nextButton" onClick={nextIndexChangeHandler}>
          Next
      </button>
    </div>
      
    </>


  );
}

export default questionModal;