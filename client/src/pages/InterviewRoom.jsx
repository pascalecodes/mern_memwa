import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
`;

export default function InterviewRoom() {
    // const getQuestions = async () => {
    //     //  const url = 'https://memwaquestionsapp.onrender.com/questions'
    //     const url = 'http://localhost:8130/questions'
    //     const response = await fetch(url, { mode: 'no-cors' })
    //     //const response = await fetch(url);
    //     let data = await response.json()
    //     //console.log(data)
    //     return data;
    // }
    let currentQuestionIndex = 0;
    let questions = [];
   

    const getQuestions = async () => {
        const url = 'https://memwaquestionsapp.onrender.com/questions'
        //const url = 'http://localhost:8130/questions';
        const response = await fetch(url);
        const data = await response.json();
        // return data;
        return data
      };
    
      useEffect(() => {
        const fetchQuestions = async () => {
          try {
            const questions = await getQuestions();
            return questions; // Do something with the questions
          } catch (error) {
            console.error('Error fetching questions:', error);
          }
        };
    
        fetchQuestions();
      }, []);
    
   


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

            {questions ? <h1>yes questions</h1> : <h1>none</h1>}
            {questions.length === 0 ? (
            <p>You have no questions.</p>
            ) : (
            <>
                {/* <div id="prompt"></div>
                <div id="questionButtons"> */}
                <button id="more-question" className="btn btn-secondary">Next</button>
                <button id="recordAnswer" className="btn btn-primary">Answer</button>
                {/* <button className="btn btn-secondary" onClick={readQuestion}>Repeat Question</button>
                </div>
                <div id="translated"></div> */}
            </>
            )}
            </div>
            
      
    </Container>
  )
}

