import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2, Star } from "lucide-react";

const StarRating = ({ value, onChange, max = 5 }) => {
  return (
    <div className="flex">
      {[...Array(max)].map((_, index) => (
        <Star
          key={index}
          className={`h-6 w-6 cursor-pointer ${
            index < value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => onChange(index + 1)}
        />
      ))}
    </div>
  );
};

const EmojiRating = ({ value, onChange, emojis }) => {
  return (
    <div className="flex space-x-2">
      {emojis.map((emoji, index) => (
        <span
          key={index}
          className={`text-2xl cursor-pointer ${index === value ? 'scale-125' : ''}`}
          onClick={() => onChange(index)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

const CreateSurvey = () => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const defaultEmojis = ['😡', '😕', '😐', '🙂', '😄'];

  const addQuestion = () => {
    setQuestions([...questions, { type: 'text', question: '', options: [], maxRating: 5, emojis: defaultEmojis }]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleEmojiChange = (questionIndex, emojiIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].emojis[emojiIndex] = value;
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
              <Card key={index} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor={`question-${index}`}>Question {index + 1}</Label>
                  <Button variant="destructive" size="icon" onClick={() => removeQuestion(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Input
                    id={`question-${index}`}
                    value={question.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                    placeholder="Enter question"
                  />
                  <Select
                    value={question.type}
                    onValueChange={(value) => handleQuestionChange(index, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="starRating">Star Rating</SelectItem>
                      <SelectItem value="emojiRating">Emoji Rating</SelectItem>
                    </SelectContent>
                  </Select>
                  {(question.type === 'multipleChoice' || question.type === 'checkbox') && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <Input
                          key={optionIndex}
                          value={option}
                          onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                      ))}
                      <Button onClick={() => addOption(index)} variant="outline" size="sm">
                        Add Option
                      </Button>
                    </div>
                  )}
                  {question.type === 'starRating' && (
                    <div className="space-y-2">
                      <Label htmlFor={`max-rating-${index}`}>Max Rating</Label>
                      <Input
                        id={`max-rating-${index}`}
                        type="number"
                        min="1"
                        max="10"
                        value={question.maxRating}
                        onChange={(e) => handleQuestionChange(index, 'maxRating', parseInt(e.target.value, 10))}
                      />
                      <Label>Preview:</Label>
                      <StarRating value={0} onChange={() => {}} max={question.maxRating} />
                    </div>
                  )}
                  {question.type === 'emojiRating' && (
                    <div className="space-y-2">
                      <Label>Customize Emojis:</Label>
                      <div className="flex space-x-2">
                        {question.emojis.map((emoji, emojiIndex) => (
                          <Input
                            key={emojiIndex}
                            value={emoji}
                            onChange={(e) => handleEmojiChange(index, emojiIndex, e.target.value)}
                            className="w-12 text-center"
                          />
                        ))}
                      </div>
                      <Label>Preview:</Label>
                      <EmojiRating value={-1} onChange={() => {}} emojis={question.emojis} />
                    </div>
                  )}
                </div>
              </Card>
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