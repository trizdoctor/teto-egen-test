import { useTest } from '@/contexts/TestContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuestionScreen() {
  const {
    currentQuestionIndex,
    shuffledQuestions,
    answers,
    setAnswer,
    nextQuestion,
    previousQuestion,
  } = useTest();
  const { t } = useLanguage();

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  if (!currentQuestion) {
    return (
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {t('질문을 불러오는 중...', 'Loading questions...')}
        </p>
      </div>
    );
  }

  const handleOptionSelect = (optionIndex: number) => {
    setAnswer(currentQuestionIndex, optionIndex);
  };

  return (
    <div className="animate-slide-up">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t('질문', 'Question')}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentQuestionIndex + 1} / {shuffledQuestions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="bg-white dark:bg-gray-800 shadow-lg mb-8">
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8 leading-relaxed">
            {currentQuestion.question}
          </h3>

          <div className="space-y-4">
            {currentQuestion.options.map((option: any, index: number) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "w-full text-left p-4 h-auto whitespace-normal justify-start transition-colors",
                  currentAnswer === index
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600 hover:border-blue-500"
                )}
                onClick={() => handleOptionSelect(index)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {t('이전', 'Previous')}
        </Button>
        
        <Button
          onClick={nextQuestion}
          disabled={currentAnswer === null}
          className="bg-gradient-teto-estrogen text-white flex items-center"
        >
          {t('다음', 'Next')}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
