import './App.css';
import Que from './components/Que.js';
import React from 'react';

function App() {

  const [quizData,setQuizData]=React.useState([])
  const [score,setScore]=React.useState(0);
  const [submitted,setSubmitted]= React.useState(false)
  const [randomArr,setRandomArr]=React.useState([])
  

  React.useEffect(()=>{
    fetch('https://the-trivia-api.com/v2/questions')
      .then((res)=>res.json())
      .then(data=>setQuizData(data))
  },[])

  /*---------------------change selected Option---------------------*/
  const handleChange= (event)=> {
    const {name,value}=event.target
    setRandomArr(prevArray=>prevArray.map((mcq)=>{
      if(mcq.id===name){
        console.log(value)
        return({
          ...mcq,
          selectedOption:value
        })
      }else{
        return mcq
      }
    }))
  }
  /*---------------------Submit and get result---------------------*/
  function handleSubmit(e){
    e.preventDefault()
    let newScore = 0;
    randomArr.forEach((question) => {
      if (question.selectedOption === question.correctOption) {
        newScore += 1;
        console.log(newScore)
      }
    });
    
    setScore(newScore);
    setSubmitted(true)
  }

  /*---------------------Reset---------------------*/
  function reset(){
    setRandomArr([])
    setScore(0)
    setSubmitted(false)
  }

  /*---------------------get 5 random mcqs arr---------------------*/ 
  
  function randoms(){
    const distinctNums = Set
    let randArr=[]
    let randNo
    while(randArr.length<5){
      randNo = Math.floor(Math.random()*(quizData.length))
      
      if(!randArr.includes(randNo)){
        randArr.push(randNo)
      }
    }
    const newArr=randArr.map(num=>{
      const options=[]
      let correctOpt= Math.floor(Math.random()*4)
      let j=0
      for(let i=0;i<4;i++){
        if(i===correctOpt){
          options.push(quizData[num].correctAnswer)
        }
        else{
          options.push( quizData[num].incorrectAnswers[j] )
          j++
        }
      }
      return({
        id:quizData[num].id,
        key:quizData[num].id,
        que:quizData[num].question.text,
        optionArray: options,
        correctOption:quizData[num].correctAnswer,
        selectedOption:""

      })
    })
    return newArr
  }
  
  /*------------------------set value of random array-----------------------*/
  function startQuiz(){
    setRandomArr(randoms)
  }

  /*------------------------elements to be rendered-------------------------*/ 
  const questions = randomArr.map((mcq)=>{

    return(
      <Que
        ques={mcq.que}
        options={mcq.optionArray}
        id={mcq.id}
        key={mcq.key}
        correctAnswer={mcq.correctOption}
        selected={mcq.selectedOption}
        handleChange={handleChange}
        isSubmitted= {submitted}
      />
    )
  })  

  /*------------------------returning app component---------------------------- */
  return (
    <div className="App">
      <main>
        {randomArr.length===0 ? <div className='home--page'>
            <h1 className='title'>Quizzical</h1>
            <p className='description'>Let's check your general knowledge</p>
            <button onClick={startQuiz} className='start'>Start Quiz</button>
          </div>:
          <div >
            {questions}
            {submitted ?<div>
              <h4>Score:{score}/5</h4>
              <button onClick={reset}>Reset</button>
            </div> :
            <button onClick={handleSubmit}>Submit</button>}
          </div>
          
        }
      </main>
    </div>
  );
}

export default App;
