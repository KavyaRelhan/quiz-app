import './App.css';
import Que from './components/Que.js';
import React from 'react';

function App() {

  const [quizData,setQuizData]=React.useState([])
  

  React.useEffect(()=>{
    fetch('https://the-trivia-api.com/v2/questions')
      .then((res)=>res.json())
      .then(data=>setQuizData(data))
  },[])

  function selectOption(questionId,optionIndex){
    setRandomArr(prevArr=>prevArr.map(mcq=>{
      if(mcq.id===questionId){
        const newOptions=[]
        for(let i=0;i<4;i++){
          if(i===optionIndex){
            newOptions.push({
              ...mcq.optionArray[i],
              isSelected:!mcq.optionArray[optionIndex].isSelected
            })
          }else{
            newOptions.push({
              ...mcq.optionArray[i],
              isSelected:false
            })
          }
        }
        return({
          ...mcq,
          optionArray:newOptions
        })
      }else{
        return mcq
      }
    }))
  }


  //function returning 5 random mcqs arr
  function randoms(){
    let randArr=[]
    let randNo
    while(randArr.length<5){
      randNo = Math.floor(Math.random()*(quizData.length))
      if(randArr.indexOf(randNo)===-1){
        const options=[]
        let correctOpt= Math.floor(Math.random()*4)
        let j=0
        for(let i=0;i<4;i++){
          if(i===correctOpt){
            options.push({
              text:quizData[randNo].correctAnswer,
              optKey:i,
              isSelected:false,
              isCorrect:true,
              handleClick: ()=>{selectOption(quizData[randNo].id,i)}
            })
          }else{
            options.push({
              text:quizData[randNo].incorrectAnswers[j],
              optKey:i,
              isSelected:false,
              isCorrect:false,
              handleClick: ()=>{selectOption(quizData[randNo].id,i)}
            })
            j++
          }
        }
        randArr.push({
          id:quizData[randNo].id,
          key:quizData[randNo].id,
          que:quizData[randNo].question.text,
          optionArray: options
        })
      }
    }
    return randArr
  }
  
  //randomArr
  const [randomArr,setRandomArr]=React.useState([])
  
  
  //to start quiz : set value of random array
  function startQuiz(){
    setRandomArr(randoms)
  }

  const questions = randomArr.map((mcq)=>{

    return(
      <Que
        ques={mcq.que}
        options={mcq.optionArray}
      />
    )
  })


  /*const questions = randomArr.map((index)=>{
    const options=[]
    let correctOpt= Math.floor(Math.random()*4)
    let j=0
    for(let i=0;i<4;i++){
      if(i===correctOpt){
        options.push(quizData[index].correctAnswer)
      }else{
        options.push(quizData[index].incorrectAnswers[j])
        j++
      }
    }

    return(
      <Que
        ques={quizData[index].question.text}
        options={options}
      />
    )
  })*/

  

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
            <button>Submit</button>
          </div>
          
        }
      </main>
    </div>
  );
}

export default App;
