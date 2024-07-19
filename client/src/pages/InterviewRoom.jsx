import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AnswerQuestion from '../components/AnswerQuestion';
//import translate from 'google-translate-api';

const Container = styled.div`
`;

export default function InterviewRoom() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionId, setQuestionId] = useState(0);
    const [translatedQuestion, setTranslatedQuestion] = useState('');

    const getQuestions = async () => {
        const url = 'https://memwaquestionsapp.onrender.com/questions'
        //const url = 'http://localhost:8130/questions';
        const response = await fetch(url);
        const data = await response.json();
        setQuestions(data); // Update the questions state with the retrieved data
      };

      const translateText = async (text, targetLang) => {
        try {
          const result = await translate(text, { to: targetLang });
          return result.text;
        } catch (error) {
          console.error('Error translating text:', error);
          return '';
        }
      };

      useEffect(() => {
        const fetchQuestions = async () => {
          try {
            await getQuestions(); // Wait for the questions to be fetched and set in the state
          } catch (error) {
            console.error('Error fetching questions:', error);
          }
        };
      
        fetchQuestions();
      }, []);

      const nextQuestion = () => {
        if (currentQuestionIndex >= questions.length) {
          setCurrentQuestionIndex(0);
        }
      
        const randomQuestionIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomQuestionIndex];

        // const translatedText = translateText(question.name, 'en'); // Translate the question to English
        // setTranslatedQuestion(translatedText);
      
        setCurrentQuestionIndex(randomQuestionIndex); // Update the currentQuestionIndex with the randomQuestionIndex
        setQuestionId(question.id)
        //console.log(question.id)
      };

  return (
    <Container>
        <div className='flex flex-col p-2 px-3 max-w-6xl mx-auto'>
        <img className="mx-auto " src="/img/logo.svg"  alt="Memwa" width="sm-80" height="sm-80"  />
        <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'>Interview Room</h1> 
        <h5 className='mx-auto text-center'>Have a prompted conversation about your life</h5>
        </div>

        <div className="px-4  py-5 mx-auto text-center">
            <h1>Chat</h1>
            <select id="language-select">
                <option value="en-US">English (US)</option>
                <option value="es-ES">Spanish (Spain)</option>
                <option value="fr-FR">French (France)</option>
                <option value="ht-HT">Haitian Creole (Haiti)</option>
            </select>

            <div className='p-3'>
                {/* <span className="text-info">{currentQuestionIndex + 1} of {questions.length} questions</span> */}
                <h5 className='text-xl text-slate-700' id="question-text">{questions[currentQuestionIndex]?.name}</h5>
                {/* <h5 id="question-text">{translatedQuestion}</h5> */}
                {/* <h5>{questions[currentQuestionIndex]?._id}</h5> */}
                <button 
                onClick={nextQuestion}
                    className='text-white text-center bg-blue-700 p-2' >Next Question</button>
                <div>
              <AnswerQuestion 
               questionId={questions[currentQuestionIndex]?.id}
               questionName={questions[currentQuestionIndex]?.name}
               questionTag={questions[currentQuestionIndex]?.tag}
              />
              </div>
            </div>
            {/* <p>{questionId}</p> */}
            
            </div>
            
            {/* <div>
      <span className="text-info">{currentQuestionIndex + 1} of {questions.length} questions</span>
      <h5 id="question-text">{questions[currentQuestionIndex]?.name}</h5>
      <button onClick={nextQuestion}>Next Question</button>
    </div> */}
    </Container>
  )
}

