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

      // const translateText = async (text, targetLang) => {
      //   try {
      //     const result = await translate(text, { to: targetLang });
      //     return result.text;
      //   } catch (error) {
      //     console.error('Error translating text:', error);
      //     return '';
      //   }
      // };

      useEffect(() => {
        const fetchQuestions = async () => {
          try {
            await getQuestions(); // Wait for the questions to be fetched and set in the state
            // setText(questions);
            // translateText(questions, targetLanguage);
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
          const text= questions[currentQuestionIndex]?.name
          
          //setText(questions[currentQuestionIndex]?.name)
          //const response = await fetch(`/api/translate?text=${textToTranslate}&target=${language}`);
          const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${language}&dt=t&q=${encodeURIComponent(textToTranslate)}`);
          const data = await response.json();
          setTranslatedText(data[0][0][0]);
          console.log('try', data[0][0][0])
        } catch (error) {
          console.error('Error translating text:', error);
        }
      };
    
      const handleLanguageChange = (event) => {
        setTargetLanguage(event.target.value);
        translateText(questions[currentQuestionIndex]?.name, event.target.value);
        console.log('test',questions[currentQuestionIndex]?.name, event.target.value )
      };

      const nextQuestion = () => {
        if (currentQuestionIndex >= questions.length) {
          setCurrentQuestionIndex(0);
        }
      
        const randomQuestionIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomQuestionIndex];

        //const translatedText = translateText(question.name, 'es'); // Translate the question to English
        // setTranslatedQuestion(translatedText);
      
        setCurrentQuestionIndex(randomQuestionIndex); // Update the currentQuestionIndex with the randomQuestionIndex
        setQuestionId(question.id)
        //console.log(question.id)


        // useEffect(() => {
        //   const fetchText = async () => {
        //     try {
        //       const response = await fetch('/api/text');
        //       const data = await response.json();
        //       setText(data.text);
        //       translateText(data.text, targetLanguage);
        //     } catch (error) {
        //       console.error('Error fetching text:', error);
        //     }
        //   };
        //   fetchText();
        // }, [targetLanguage]);
      
        // const translateText = async (textToTranslate, language) => {
        //   try {
        //     const response = await fetch(`/api/translate?text=${textToTranslate}&target=${language}`);
        //     const data = await response.json();
        //     setTranslatedText(data.text);
        //   } catch (error) {
        //     console.error('Error translating text:', error);
        //   }
        // };
      
        // const handleLanguageChange = (event) => {
        //   setTargetLanguage(event.target.value);
        // };

      };


  return (
    <Container>
        <div className='flex flex-col p-2 px-3 max-w-6xl mx-auto'>
        <img className="mx-auto " src="/img/logo.svg"  alt="Memwa" width="sm-80" height="sm-80"  />
        <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'>Interview Room</h1> 
        <h5 className='mx-auto text-center'>Have a prompted conversation about your life</h5>
        </div>

        <div className="px-4  py-5 mx-auto text-center">
            {/* <h1>Chat</h1> */}
            {/* <label className="text-blue-700" htmlFor="language-select" value={targetLanguage} onChange={handleLanguageChange}>Select a language: </label>
            <select id="language-select">
                <option value="en-US">English (US)</option>
                <option value="es-ES">Spanish (Spain)</option>
                <option value="fr-FR">French (France)</option>
                <option value="ht-HT">Haitian Creole (Haiti)</option>
            </select> */}

        
            
      
            
            {/* <label htmlFor="language-select">Select a language:</label>
            <select id="language-select" value={targetLanguage} onChange={handleLanguageChange}>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select> */}
           

            <div className='p-4'>
                {/* <span className="text-info">{currentQuestionIndex + 1} of {questions.length} questions</span> */}
                <p>Question (English):</p>
                <h5 className='text-xl text-slate-700 pb-4' id="question-text">{questions[currentQuestionIndex]?.name}</h5>
                {/* <h5 id="question-text">{translatedQuestion}</h5> */}
                {/* <h5>{questions[currentQuestionIndex]?._id}</h5> */}
                {/* <p>Translated text ({targetLanguage}): {translatedText}</p> */}

                <label className="text-blue-700" htmlFor="language-select">Translate to :</label>
                  <select id="language-select" value={targetLanguage} onChange={handleLanguageChange}>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Spanish (Spain)</option>
                    <option value="fr-FR">French (France)</option>
                    <option value="ht-HT">Haitian Creole (Haiti)</option>
                  </select>
                <p className='pt-4'>Translated Question (English):</p>
                <h5 className='text-xl text-blue-700' id="question-text">{translatedText}</h5>
              

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

