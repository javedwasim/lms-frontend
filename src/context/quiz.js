'use client';

import { useState, useContext, createContext } from 'react';

export const QuizContext = createContext(null);
export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([6, 7, 8]);

  return (
    <QuizContext.Provider
      value={{
        selectedQuestionIds,
        setSelectedQuestionIds,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
