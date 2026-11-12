import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { photographyFaqs } from "../../data/photographyFaq";

const enquiryOptions = [
  {
    id: "pricing",
    label: "Pricing & packages",
    prompt: "What kind of photoshoot are you planning, and what would you like to know about pricing?",
    placeholder: "For example: wedding photography for one day...",
  },
  {
    id: "service",
    label: "Choose a service",
    prompt: "Which photography service are you interested in?",
  },
  {
    id: "availability",
    label: "Check availability",
    prompt: "What date and location are you considering?",
    placeholder: "For example: 18 March, Gorakhpur...",
  },
  {
    id: "plan",
    label: "Plan a photoshoot",
    prompt: "Tell us about the occasion and the style of photos you have in mind.",
    placeholder: "Describe the occasion, location, or style...",
  },
  {
    id: "other",
    label: "Ask another question",
    prompt: "What would you like to ask the photographer?",
    placeholder: "Type your question...",
  },
];

const tokenize = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .match(/[a-z0-9]+/g) || [];

function ChatAssistant() {
  const { services, settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const [answer, setAnswer] = useState("");
  const [customService, setCustomService] = useState("");
  const [answers, setAnswers] = useState([]);
  const [quickQuestion, setQuickQuestion] = useState("");
  const [quickReplies, setQuickReplies] = useState([]);

  const whatsappNumber = String(settings.whatsapp || "").replace(/\D/g, "");
  const whatsappMessage = [
    `Hello ${settings.ownerName || ""}, I would like help with a photography enquiry.`,
    ...answers.map(({ label, response }) => `${label}: ${response}`),
  ].join("\n\n");
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : "";

  const chooseOption = (option) => {
    setActiveOption(option);
    setAnswer("");
    setCustomService("");
  };

  const saveAnswer = (event) => {
    event.preventDefault();
    const response = (answer === "__other__" ? customService : answer).trim();
    if (!activeOption || !response) return;

    setAnswers((previous) => [
      ...previous,
      { label: activeOption.label, response },
    ]);
    setActiveOption(null);
    setAnswer("");
    setCustomService("");
  };

  const answerQuickQuestion = (event) => {
    event.preventDefault();
    const question = quickQuestion.trim();
    const queryWords = tokenize(question);
    const querySet = new Set(queryWords);
    const bestMatch = queryWords.length >= 2 ? photographyFaqs
      .map((faq) => {
        const phraseWords = tokenize(faq.phrase);
        const allWordsMatch = phraseWords.every((word) => querySet.has(word));
        const phraseInOrder = question.toLowerCase().includes(faq.phrase);
        return {
          ...faq,
          score: allWordsMatch ? phraseWords.length * 10 + (phraseInOrder ? 5 : 0) : 0,
        };
      })
      .reduce((best, faq) => faq.score > (best?.score || 0) ? faq : best, null) : null;

    const matched = Boolean(bestMatch?.score);
    const response = matched
      ? bestMatch.answer
      : "I couldn't find a confident answer for that. Continue to WhatsApp and ask the photographer directly.";

    setQuickReplies((previous) => [...previous, { question, response, matched }]);
    if (!matched) {
      setAnswers((previous) => [...previous, { label: "Question", response: question }]);
    }
    setQuickQuestion("");
  };

  return (
    <div className="chat-assistant">
      {isOpen && (
        <section className="chat-assistant-panel" role="dialog" aria-label="Photography booking assistant">
          <header className="chat-assistant-header">
            <div>
              <span className="chat-assistant-status" aria-hidden="true" />
              <div>
                <h2>Photo assistant</h2>
                <p>Let’s plan something beautiful</p>
              </div>
            </div>
            <button
              className="chat-assistant-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat assistant"
            >
              ×
            </button>
          </header>

          <div className="chat-assistant-body" aria-live="polite">
            <p className="chat-bubble chat-bubble-assistant">
              Hi! I can help with pricing, services, availability, or planning your shoot. What would you like help with?
            </p>

            {answers.map((item, index) => (
              <div className="chat-answer-pair" key={`${item.label}-${index}`}>
                <p className="chat-bubble chat-bubble-user">{item.label}: {item.response}</p>
                <p className="chat-bubble chat-bubble-assistant">Thanks! You can add another detail or send this to WhatsApp.</p>
              </div>
            ))}

            {quickReplies.map((reply, index) => (
              <div className="chat-answer-pair" key={`quick-${index}`}>
                <p className="chat-bubble chat-bubble-user">{reply.question}</p>
                <p className="chat-bubble chat-bubble-assistant">
                  {reply.response}
                  {!reply.matched && whatsappUrl && (
                    <> <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp</a></>
                  )}
                </p>
              </div>
            ))}

            {activeOption ? (
              <form className="chat-assistant-question" onSubmit={saveAnswer}>
                <p className="chat-bubble chat-bubble-assistant">{activeOption.prompt}</p>
                {activeOption.id === "service" && services.length > 0 ? (
                  <select
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    aria-label="Select a photography service"
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>{service.title}</option>
                    ))}
                    <option value="__other__">Something else</option>
                  </select>
                ) : (
                  <textarea
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    placeholder={activeOption.placeholder || "Tell us a little more..."}
                    rows="3"
                    aria-label="Your answer"
                    required
                  />
                )}
                {activeOption.id === "service" && answer === "__other__" && (
                  <input
                    value={customService}
                    onChange={(event) => setCustomService(event.target.value)}
                    placeholder="Which service do you have in mind?"
                    aria-label="Other photography service"
                    required
                  />
                )}
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={activeOption.id === "service" && answer === "__other__" ? !customService.trim() : !answer.trim()}
                >
                  Add answer
                </button>
              </form>
            ) : (
              <>
              <form className="chat-quick-question" onSubmit={answerQuickQuestion}>
                <label htmlFor="chat-quick-question">Ask a quick photography question</label>
                <div>
                  <input
                    id="chat-quick-question"
                    value={quickQuestion}
                    onChange={(event) => setQuickQuestion(event.target.value)}
                    placeholder="e.g. wedding photo price"
                    minLength={1}
                    maxLength={180}
                    required
                  />
                  <button type="submit" disabled={!quickQuestion.trim()}>Ask</button>
                </div>
                <small>Answers match two or more photography keywords.</small>
              </form>
              <div className="chat-assistant-options" aria-label="Enquiry topics">
                {enquiryOptions.map((option) => (
                  <button key={option.id} type="button" onClick={() => chooseOption(option)}>
                    {option.label}<span aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
              </>
            )}
          </div>

          <footer className="chat-assistant-footer">
            {whatsappUrl ? (
              <a
                className="chat-whatsapp-button"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Continue in WhatsApp <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <p className="chat-assistant-unavailable">WhatsApp contact is not configured yet.</p>
            )}
            {whatsappUrl && (
              <small>{answers.length === 0 ? "Continue to WhatsApp anytime, or answer a prompt to include details." : "Your answers are included in the WhatsApp message."}</small>
            )}
          </footer>
        </section>
      )}

      <button
        className={`chat-assistant-toggle ${isOpen ? "is-open" : ""}`}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close photography assistant" : "Open photography assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <span aria-hidden="true">×</span>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 5.75A2.75 2.75 0 0 1 6.75 3h10.5A2.75 2.75 0 0 1 20 5.75v7.5A2.75 2.75 0 0 1 17.25 16H10l-5 4v-4.25A2.75 2.75 0 0 1 4 13.5z" />
            <path d="M8 8h8M8 11.5h5" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default ChatAssistant;
