import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

const CreateSurvey = () => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { type: 'text', question: '' }]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleSaveSurvey = () => {
    console.log('Survey saved:', { title: surveyTitle, questions });
    // Here you would typically send this data to your backend
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Survey</h1>
      <Card>
        <CardHeader>
          <CardTitle>Survey Details</CardTitle>
          <CardDescription>Enter the title for your new survey and add questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="survey-title">Survey Title</Label>
              <Input
                id="survey-title"
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                placeholder="Enter survey title"
              />
            </div>
            {questions.map((question, index) => (
              <div key={index}>
                <Label htmlFor={`question-${index}`}>Question {index + 1}</Label>
                <Input
                  id={`question-${index}`}
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder="Enter question"
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={addQuestion} variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Question
          </Button>
          <Button onClick={handleSaveSurvey}>Save Survey</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateSurvey;