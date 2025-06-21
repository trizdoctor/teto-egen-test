import { createContext, useContext, useState, useCallback } from 'react';
import { shuffleArray } from '@/lib/utils';
import { questionBank } from '@/data/questions';

type Gender = 'male' | 'female' | null;
type Screen = 'welcome' | 'gender' | 'question' | 'loading' | 'result';

interface TestResults {
  type: string;
  tetoPercentage: number;
  estrogenPercentage: number;
  gender: Gender;
  intensity: string;
}

interface TestContextType {
  currentScreen: Screen;
  selectedGender: Gender;
  currentQuestionIndex: number;
  answers: (number | null)[];
  shuffledQuestions: any[];
  testResults: TestResults | null;
  currentLanguage: 'ko' | 'en';
  setCurrentScreen: (screen: Screen) => void;
  setSelectedGender: (gender: Gender) => void;
  initializeQuestions: (language: 'ko' | 'en') => void;
  updateQuestionsLanguage: (language: 'ko' | 'en') => void;
  setAnswer: (index: number, answer: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setCurrentQuestionIndex: (index: number) => void;
  setTestResults: (results: TestResults) => void;
  resetTest: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export function TestProvider({ children }: { children: React.ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedGender, setSelectedGender] = useState<Gender>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<'ko' | 'en'>('ko');

  const initializeQuestions = (language: 'ko' | 'en') => {
    const questions = questionBank[language] || questionBank.ko;
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
    setAnswers(new Array(shuffled.length).fill(null));
    setCurrentQuestionIndex(0);
    setCurrentLanguage(language);
  };

  const updateQuestionsLanguage = useCallback((language: 'ko' | 'en') => {
    if (shuffledQuestions.length > 0 && currentLanguage !== language) {
      const questions = questionBank[language] || questionBank.ko;
      // Maintain the same order by mapping existing questions to new language
      const updatedQuestions = shuffledQuestions.map((_, index) => questions[index % questions.length]);
      setShuffledQuestions(updatedQuestions);
      setCurrentLanguage(language);
    }
  }, [shuffledQuestions, currentLanguage]);

  const setAnswer = (index: number, answer: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentScreen('loading');
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetTest = () => {
    setCurrentScreen('welcome');
    setSelectedGender(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShuffledQuestions([]);
    setTestResults(null);
  };

  return (
    <TestContext.Provider
      value={{
        currentScreen,
        selectedGender,
        currentQuestionIndex,
        answers,
        shuffledQuestions,
        testResults,
        currentLanguage,
        setCurrentScreen,
        setSelectedGender,
        initializeQuestions,
        updateQuestionsLanguage,
        setAnswer,
        nextQuestion,
        previousQuestion,
        setCurrentQuestionIndex,
        setTestResults,
        resetTest,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}
