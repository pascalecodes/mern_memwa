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
    //const [translatedQuestion, setTranslatedQuestion] = useState('');
    //const [text, setText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('en-US');
    const [translatedText, setTranslatedText] = useState('');

    const getQuestions = async () => {
        const url = 'https://memwaquestionsapp.onrender.com/questions'
        //const url = 'http://localhost:8130/questions';
        const response = await fetch(url);
        const data = await response.json();
        setQuestions(data); // Update the questions state with the retrieved data
      };

      useEffect(() => {
        const fetchQuestions = async () => {
          try {
            await getQuestions(); // Wait for the questions to be fetched and set in the state
            //console.log(questions)
            //console.log(questions[currentQuestionIndex]?.name)
           
          } catch (error) {
            console.error('Error fetching questions:', error);
          }
        };
      
        fetchQuestions();
    
      }, []);

      const translateText = async (textToTranslate, language) => {
        try {
          //const response = await fetch(`/api/translate?text=${textToTranslate}&target=${language}`);
          const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${language}&dt=t&q=${encodeURIComponent(textToTranslate)}`);
          const data = await response.json();
          setTranslatedText(data[0][0][0]);
          //setTranslatedText(data.data.translations[0].translatedText); --> not working
          //console.log('try', data[0][0][0])
        } catch (error) {
          console.error('Error translating text:', error);
        }
      };

      useEffect(() => {
        translateText(questions[currentQuestionIndex]?.name, targetLanguage);
      }, [currentQuestionIndex, questions, targetLanguage]);
    
      const handleLanguageChange = (event) => {
        setTargetLanguage(event.target.value);
        translateText(questions[currentQuestionIndex]?.name, event.target.value);
        //console.log('test',questions[currentQuestionIndex]?.name, event.target.value )
      };
      

      const nextQuestion = () => {
        if (currentQuestionIndex >= questions.length) {
          setCurrentQuestionIndex(0);
        }
        const randomQuestionIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomQuestionIndex];
        setCurrentQuestionIndex(randomQuestionIndex); // Update the currentQuestionIndex with the randomQuestionIndex
        
        setQuestionId(question.id)
        //console.log(question.id)

      };

      async function readQuestion() {
        // Get the question text
        // let questionText = document.getElementById("question-text").textContent;
        // const selectedLanguage = document.getElementById("language-select").value;
    
        // const translatedText = await translateText(questionText, selectedLanguage);
       
        // Create a SpeechSynthesisUtterance object
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = translatedText;
        utterance.lang = targetLanguage;
        speechSynthesis.rate = 0.25
        speechSynthesis.pitch = 1; // slightly higher pitch
        console.log(targetLanguage)
        // Speak the question using the Web Speech API
        speechSynthesis.speak(utterance);
        //document.querySelector('#translated').innerHTML = `<h5 id="translated-text" >${translatedText}</h5>`;
    }


  return (
    <Container>
        <div className='flex flex-col p-2 px-3 max-w-6xl mx-auto'>
        <img className="mx-auto " src="/img/logo.svg"  alt="Memwa" width="sm-80" height="sm-80"  />
        <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'>Interview Room</h1> 
        <h5 className='mx-auto text-center'>Have a prompted conversation about your life</h5>
        </div>

        <div className="px-4  py-5 mx-auto text-center">
            {/* <h1>Chat</h1> */}
            <div className='p-4'>
                {/* <span className="text-info">{currentQuestionIndex + 1} of {questions.length} questions</span> */}
                <p>Question (English):</p>
                <h5 className='text-xl text-slate-700 pb-4' id="question-text" onChange={handleLanguageChange}>{questions[currentQuestionIndex]?.name}</h5>
                {/* <h5 id="question-text">{translatedQuestion}</h5> */}
                {/* <h5>{questions[currentQuestionIndex]?._id}</h5> */}
                {/* <p>Translated text ({targetLanguage}): {translatedText}</p> */}

                <label className="text-slate-700" htmlFor="language-select">Translate to :</label>
                  <select className='text-blue-700' id="language-select" value={targetLanguage} onChange={handleLanguageChange}>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Spanish (Spain)</option>
                    <option value="fr-FR">French (France)</option>
                    <option value="ht-HT">Haitian Creole (Haiti)</option>
                  </select>
                {/* <p className='pt-4'>Translated Question (English):</p> */}
                <h5 className='text-xl text-blue-700' id="question-text">{translatedText}</h5>
              
                <button 
                onClick={nextQuestion} onChange={handleLanguageChange}
                    className='text-white text-center bg-blue-700 p-2' >Next Question</button>
                    <button 
                onClick={readQuestion}
                    className='text-white text-center bg-green-700 p-2 m-2' >Read</button>
                <div>
              <AnswerQuestion 
               questionId={questions[currentQuestionIndex]?.id}
               questionName={questions[currentQuestionIndex]?.name}
               questionTag={questions[currentQuestionIndex]?.tag}
              />
              </div>
            </div>
            
            </div>

    </Container>
  )
}

