'use client'

import { useState } from 'react'

const questions = [
  {
    category: 'Naturee',
    question: 'Which animal has three hearts?',
    answers: ['Blue whale', 'Octopus', 'Sea turtle', 'Dolphin'],
    correct: 1,
    fact: 'Two hearts pump blood to the gills, while the third keeps it flowing to the body.',
  },
  {
    category: 'Space',
    question: 'Which planet has the most moons?',
    answers: ['Jupiter', 'Neptune', 'Saturn', 'Uranus'],
    correct: 2,
    fact: 'Saturn has the most confirmed moons in our solar system — and scientists keep finding more.',
  },
  {
    category: 'Food',
    question: 'Which of these is actually a berry?',
    answers: ['Strawberry', 'Raspberry', 'Blackberry', 'Banana'],
    correct: 3,
    fact: 'Botanically speaking, bananas are berries. Strawberries, surprisingly, aren’t.',
  },
  {
    category: 'Science',
    question: 'What is the only metal that is liquid at room temperature?',
    answers: ['Mercury', 'Gallium', 'Cesium', 'Bromine'],
    correct: 0,
    fact: 'Mercury stays liquid at room temperature, though it freezes at about −39°F (−39°C).',
  },
  {
    category: 'Our world',
    question: 'What is the smallest country in the world?',
    answers: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'],
    correct: 2,
    fact: 'Vatican City covers just 0.49 square kilometers and sits entirely within Rome.',
  },
]

const letters = ['A', 'B', 'C', 'D']

export function QuizApp() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const question = questions[current]
  const progress = finished ? 100 : (current / questions.length) * 100

  function chooseAnswer(index: number) {
    if (selected !== null) return
    setSelected(index)
    if (index === question.correct) setScore((value) => value + 1)
  }

  function goNext() {
    if (current === questions.length - 1) {
      setFinished(true)
      return
    }
    setCurrent((value) => value + 1)
    setSelected(null)
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  const encouragement = score === questions.length
    ? 'A perfect little streak.'
    : score >= 3
      ? 'You know a thing or two.'
      : 'Curiosity looks good on you.'

  return (
    <main className="quiz-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Little by little home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>little by little</span>
        </a>
        <span className="header-note">A tiny quiz for curious minds</span>
        <a className="header-link" href="#about">Made for a mindful minute <span aria-hidden="true">↗</span></a>
      </header>

      <div className="quiz-layout" id="home">
        <aside className="quiz-intro">
          <p className="eyebrow"><span className="eyebrow-dot" /> YOUR DAILY BRAIN BREAK</p>
          <h1>A little<br />knowledge goes<br /><em>a long way.</em></h1>
          <p className="intro-copy">Five questions. A handful of fun facts. One lovely little minute for your mind.</p>
          <div className="intro-footer">
            <div className="avatar-stack" aria-hidden="true"><span>J</span><span>M</span><span>A</span></div>
            <span>Join <strong>2,500+</strong> curious people</span>
          </div>
          <span className="decorative-spark" aria-hidden="true">✳</span>
        </aside>

        <section className="quiz-card" aria-label="Daily quiz">
          <div className="card-topline">
            <span className="today-label"><span aria-hidden="true">✳</span> THE DAILY QUIZ</span>
            <span className="question-count">{finished ? questions.length : current + 1}<span> / {questions.length}</span></span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={finished ? questions.length : current}
          >
            <span style={{ width: `${progress}%` }} />
          </div>

          {finished ? (
            <div className="result-content" aria-live="polite">
              <div className="result-icon" aria-hidden="true">{score === questions.length ? '✳' : '✦'}</div>
              <p className="eyebrow result-eyebrow">THAT&apos;S A WRAP</p>
              <h2>{encouragement}</h2>
              <p className="result-score">You got <strong>{score} out of {questions.length}</strong> questions right.</p>
              <p className="result-note">The best part? You learned something new along the way.</p>
              <button className="next-button replay-button" type="button" onClick={restart}>Take it again <span aria-hidden="true">↻</span></button>
            </div>
          ) : (
            <>
              <div className="question-content" key={current}>
                <p className="category-label">{question.category}</p>
                <h2>{question.question}</h2>
                <p className="choose-hint">Choose one answer</p>
                <div className="answer-list" role="group" aria-label="Answer choices">
                  {question.answers.map((answer, index) => {
                    const isSelected = selected === index
                    const isCorrect = index === question.correct
                    const answerClass = selected === null
                      ? 'answer-option'
                      : `answer-option ${isCorrect ? 'is-correct' : isSelected ? 'is-incorrect' : 'is-muted'}`
                    return (
                      <button
                        className={answerClass}
                        type="button"
                        key={answer}
                        onClick={() => chooseAnswer(index)}
                        disabled={selected !== null}
                        aria-pressed={isSelected}
                      >
                        <span className="answer-letter">{letters[index]}</span>
                        <span className="answer-text">{answer}</span>
                        {selected !== null && isCorrect && <span className="answer-result" aria-label="Correct">✓</span>}
                        {isSelected && !isCorrect && <span className="answer-result" aria-label="Your answer">×</span>}
                      </button>
                    )
                  })}
                </div>
                {selected !== null && (
                  <div className={`feedback ${selected === question.correct ? 'feedback-correct' : 'feedback-incorrect'}`} role="status">
                    <strong>{selected === question.correct ? 'You got it!' : 'Not quite!'}</strong>
                    <span>{question.fact}</span>
                  </div>
                )}
              </div>
              <div className="card-bottom">
                <span className="time-note"><span aria-hidden="true">◷</span> About 1 minute</span>
                {selected !== null && (
                  <button className="next-button" type="button" onClick={goNext}>
                    {current === questions.length - 1 ? 'See my score' : 'Next question'}
                    <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
            </>
          )}
        </section>
      </div>

      <footer className="page-footer" id="about">
        <span>A small moment of wonder, every day.</span>
        <span>Take a breath. Learn a thing. <span className="footer-heart" aria-label="with care">♥</span></span>
      </footer>
    </main>
  )
}

export default QuizApp
