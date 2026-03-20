import React, { useMemo, useState } from 'react';

const themeData = {
  Familie: [
    { it: 'la madre', nl: 'de moeder', type: 'znw' },
    { it: 'il padre', nl: 'de vader', type: 'znw' },
    { it: 'la sorella', nl: 'de zus', type: 'znw' },
    { it: 'il fratello', nl: 'de broer', type: 'znw' },
    { it: 'la nonna', nl: 'de oma', type: 'znw' },
    { it: 'il nonno', nl: 'de opa', type: 'znw' },
    { it: 'la zia', nl: 'de tante', type: 'znw' },
    { it: 'lo zio', nl: 'de oom', type: 'znw' },
    { it: 'il figlio', nl: 'de zoon', type: 'znw' },
    { it: 'la figlia', nl: 'de dochter', type: 'znw' },
    { it: 'i genitori', nl: 'de ouders', type: 'znw' },
    { it: 'i nonni', nl: 'de grootouders', type: 'znw' },
  ],
  Keuken: [
    { it: 'la cucina', nl: 'de keuken', type: 'znw' },
    { it: 'il tavolo', nl: 'de tafel', type: 'znw' },
    { it: 'la sedia', nl: 'de stoel', type: 'znw' },
    { it: 'il piatto', nl: 'het bord', type: 'znw' },
    { it: 'il bicchiere', nl: 'het glas', type: 'znw' },
    { it: 'la forchetta', nl: 'de vork', type: 'znw' },
    { it: 'il coltello', nl: 'het mes', type: 'znw' },
    { it: 'il cucchiaio', nl: 'de lepel', type: 'znw' },
    { it: 'il pane', nl: 'het brood', type: 'znw' },
    { it: 'la pasta', nl: 'de pasta', type: 'znw' },
    { it: 'il vino', nl: 'de wijn', type: 'znw' },
    { it: "l'acqua", nl: 'het water', type: 'znw' },
  ],
  Huis: [
    { it: 'la casa', nl: 'het huis', type: 'znw' },
    { it: 'la stanza', nl: 'de kamer', type: 'znw' },
    { it: 'il soggiorno', nl: 'de woonkamer', type: 'znw' },
    { it: 'la camera da letto', nl: 'de slaapkamer', type: 'znw' },
    { it: 'il bagno', nl: 'de badkamer', type: 'znw' },
    { it: 'la finestra', nl: 'het raam', type: 'znw' },
    { it: 'la porta', nl: 'de deur', type: 'znw' },
    { it: 'il letto', nl: 'het bed', type: 'znw' },
    { it: 'la lampada', nl: 'de lamp', type: 'znw' },
    { it: 'il giardino', nl: 'de tuin', type: 'znw' },
  ],
  Werk: [
    { it: 'il lavoro', nl: 'het werk', type: 'znw' },
    { it: "l'ufficio", nl: 'het kantoor', type: 'znw' },
    { it: 'il collega', nl: 'de collega', type: 'znw' },
    { it: 'la riunione', nl: 'de vergadering', type: 'znw' },
    { it: 'il progetto', nl: 'het project', type: 'znw' },
    { it: 'il cliente', nl: 'de klant', type: 'znw' },
    { it: 'il computer', nl: 'de computer', type: 'znw' },
    { it: 'il messaggio', nl: 'het bericht', type: 'znw' },
    { it: 'la pausa', nl: 'de pauze', type: 'znw' },
    { it: 'il contratto', nl: 'het contract', type: 'znw' },
  ],
};

const verbGroups = [
  { group: '-are', example: 'parlare → parlo', count: 158 },
  { group: '-ere', example: 'credere → credo', count: 27 },
  { group: '-ire', example: 'dormire → dormo', count: 18 },
  { group: '-isc-', example: 'preferire → preferisco', count: 8 },
  { group: 'Onregelmatig', example: 'essere → sono', count: 30 },
];

const verbExamples = {
  '-are': [
    ['parlare', 'spreken'],
    ['lavorare', 'werken'],
    ['studiare', 'studeren'],
  ],
  '-ere': [
    ['credere', 'geloven'],
    ['ricevere', 'ontvangen'],
    ['vendere', 'verkopen'],
  ],
  '-ire': [
    ['dormire', 'slapen'],
    ['partire', 'vertrekken'],
    ['seguire', 'volgen'],
  ],
  '-isc-': [
    ['preferire', 'verkiezen'],
    ['pulire', 'schoonmaken'],
    ['costruire', 'bouwen'],
  ],
  Onregelmatig: [
    ['essere', 'zijn'],
    ['avere', 'hebben'],
    ['andare', 'gaan'],
  ],
};

function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function ProgressPill({ label, value }) {
  return (
    <div className="progress-pill">
      <div className="progress-label">{label}</div>
      <div className="progress-value">{value}</div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('home');
  const [selectedTheme, setSelectedTheme] = useState('Familie');
  const [showTranslation, setShowTranslation] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [difficult, setDifficult] = useState([]);
  const [quizDirection, setQuizDirection] = useState('it-nl');
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const currentWords = themeData[selectedTheme];
  const quizWords = useMemo(() => currentWords.slice(0, 8), [currentWords]);
  const currentQuizWord = quizWords[quizIndex % quizWords.length];

  function toggleTranslation(word) {
    setShowTranslation((prev) => ({ ...prev, [word]: !prev[word] }));
  }

  function toggleFavorite(word) {
    setFavorites((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  }

  function toggleDifficult(word) {
    setDifficult((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  }

  function checkAnswer() {
    const expected = quizDirection === 'it-nl' ? currentQuizWord.nl : currentQuizWord.it;
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedExpected = expected.trim().toLowerCase();

    if (!normalizedAnswer) {
      setFeedback('Vul eerst een antwoord in.');
      return;
    }

    if (normalizedAnswer === normalizedExpected) {
      setFeedback('Goed gedaan.');
    } else {
      setFeedback(`Nog niet goed. Juiste antwoord: ${expected}`);
      if (!difficult.includes(currentQuizWord.it)) {
        setDifficult((prev) => [...prev, currentQuizWord.it]);
      }
    }
  }

  function nextQuestion() {
    setQuizIndex((prev) => (prev + 1) % quizWords.length);
    setAnswer('');
    setFeedback('');
  }

  const totalWords = Object.values(themeData).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="app-shell">
      <div className="container">
        <header className="page-header">
          <Card className="padded-lg">
            <div className="header-row">
              <div>
                <p className="eyebrow">Werkende webapp · eerste versie</p>
                <h1>Italiaanse leerapp</h1>
                <p className="lead">
                  Deze versie is al meer dan een mock-up: je kunt thema’s openen, woorden bekijken, vertalingen tonen,
                  favorieten opslaan en een eerste quiz doen.
                </p>
              </div>
              <div className="pill-row">
                <ProgressPill label="Thema’s" value={Object.keys(themeData).length} />
                <ProgressPill label="Woorden" value={totalWords} />
                <ProgressPill label="Moeilijk" value={difficult.length} />
              </div>
            </div>
          </Card>
        </header>

        {tab === 'home' && (
          <div className="stack-lg">
            <section className="grid three">
              <Card className="padded">
                <p className="muted small">Startpunt</p>
                <h3>Themawoorden</h3>
                <p className="muted">Begin met kleine, concrete woordgroepen.</p>
              </Card>
              <Card className="padded">
                <p className="muted small">Slim leren</p>
                <h3>Favorieten</h3>
                <p className="muted">Bewaar woorden die je extra wilt herhalen.</p>
              </Card>
              <Card className="padded">
                <p className="muted small">Oefenen</p>
                <h3>Quiz</h3>
                <p className="muted">Test jezelf direct in twee richtingen.</p>
              </Card>
            </section>

            <section>
              <div className="section-head">
                <h2>Thema’s</h2>
                <span className="muted small">Kies een startthema</span>
              </div>
              <div className="grid four">
                {Object.entries(themeData).map(([name, words]) => (
                  <Card key={name} className="padded">
                    <h3>{name}</h3>
                    <p className="muted">{words.length} woorden</p>
                    <button
                      onClick={() => {
                        setSelectedTheme(name);
                        setTab('themes');
                      }}
                      className="button primary mt"
                    >
                      Open thema
                    </button>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === 'themes' && (
          <div className="stack-lg">
            <section className="chip-row">
              {Object.keys(themeData).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`chip ${selectedTheme === theme ? 'active' : ''}`}
                >
                  {theme}
                </button>
              ))}
            </section>

            <Card className="padded-lg">
              <div className="section-head wrap-gap">
                <div>
                  <h2>{selectedTheme}</h2>
                  <p className="muted small">Tik op “toon vertaling” om jezelf eerst te testen.</p>
                </div>
                <button onClick={() => setTab('practice')} className="button primary">
                  Oefen dit thema
                </button>
              </div>

              <div className="grid three">
                {currentWords.map((word) => (
                  <div key={word.it} className="word-card">
                    <div className="space-between gap">
                      <div>
                        <p className="word-title">{word.it}</p>
                        <p className="tiny-label">{word.type}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(word.it)}
                        className={`star-btn ${favorites.includes(word.it) ? 'active' : ''}`}
                        aria-label="favoriet"
                      >
                        ★
                      </button>
                    </div>

                    <div className="translation-box">
                      {showTranslation[word.it] ? (
                        <p>{word.nl}</p>
                      ) : (
                        <p className="placeholder">Vertaling verborgen</p>
                      )}
                    </div>

                    <div className="button-row">
                      <button onClick={() => toggleTranslation(word.it)} className="button secondary small-btn">
                        {showTranslation[word.it] ? 'Verberg vertaling' : 'Toon vertaling'}
                      </button>
                      <button onClick={() => toggleDifficult(word.it)} className="button secondary small-btn">
                        {difficult.includes(word.it) ? 'Niet meer moeilijk' : 'Moeilijk'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {tab === 'verbs' && (
          <div className="stack-lg">
            <div className="section-head">
              <h2>Werkwoorden</h2>
              <span className="muted small">Voorbereid op jouw didactische indeling</span>
            </div>
            <div className="grid two">
              {verbGroups.map((verb) => (
                <Card key={verb.group} className="padded">
                  <div className="space-between gap align-start">
                    <div>
                      <h3>{verb.group}</h3>
                      <p className="muted">{verb.count} werkwoorden</p>
                      <p className="muted mt-sm">{verb.example}</p>
                      <div className="mt-sm stack-sm">
                        {verbExamples[verb.group].map(([it, nl]) => (
                          <p key={it} className="verb-example">{it} — {nl}</p>
                        ))}
                      </div>
                    </div>
                    <button className="button secondary small-btn">Later uitwerken</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab === 'practice' && (
          <div className="stack-lg">
            <Card className="padded-lg">
              <div className="section-head wrap-gap">
                <div>
                  <h2>Quiz · {selectedTheme}</h2>
                  <p className="muted small">Eerste werkende oefenvorm voor je webapp.</p>
                </div>
                <div className="chip-row">
                  <button
                    onClick={() => setQuizDirection('it-nl')}
                    className={`chip ${quizDirection === 'it-nl' ? 'active' : ''}`}
                  >
                    Italiaans → Nederlands
                  </button>
                  <button
                    onClick={() => setQuizDirection('nl-it')}
                    className={`chip ${quizDirection === 'nl-it' ? 'active' : ''}`}
                  >
                    Nederlands → Italiaans
                  </button>
                </div>
              </div>

              <div className="quiz-box">
                <p className="muted small">Vraag {quizIndex + 1} van {quizWords.length}</p>
                <p className="quiz-term">{quizDirection === 'it-nl' ? currentQuizWord.it : currentQuizWord.nl}</p>

                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Typ je antwoord"
                  className="text-input"
                />

                <div className="button-row mt-sm">
                  <button onClick={checkAnswer} className="button primary">Controleer</button>
                  <button onClick={nextQuestion} className="button secondary">Volgende</button>
                  <button
                    onClick={() => setFeedback(`Juiste antwoord: ${quizDirection === 'it-nl' ? currentQuizWord.nl : currentQuizWord.it}`)}
                    className="button secondary"
                  >
                    Toon antwoord
                  </button>
                </div>

                {feedback && <p className="feedback">{feedback}</p>}
              </div>
            </Card>

            <Card className="padded">
              <h3>Moeilijke woorden</h3>
              {difficult.length === 0 ? (
                <p className="muted">Nog geen moeilijke woorden opgeslagen.</p>
              ) : (
                <div className="tag-row mt-sm">
                  {difficult.map((word) => (
                    <span key={word} className="tag">{word}</span>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {tab === 'profile' && (
          <div className="stack-lg">
            <Card className="padded-lg">
              <h2>Jouw overzicht</h2>
              <div className="grid two mt">
                <div className="subpanel">
                  <p className="muted small">Favorieten</p>
                  {favorites.length === 0 ? (
                    <p className="muted">Nog geen favorieten gekozen.</p>
                  ) : (
                    <div className="tag-row mt-sm">
                      {favorites.map((word) => (
                        <span key={word} className="tag white">{word}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="subpanel">
                  <p className="muted small">Moeilijke woorden</p>
                  {difficult.length === 0 ? (
                    <p className="muted">Nog geen moeilijke woorden geregistreerd.</p>
                  ) : (
                    <div className="tag-row mt-sm">
                      {difficult.map((word) => (
                        <span key={word} className="tag white">{word}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        <nav className="bottom-nav-wrap">
          <div className="bottom-nav">
            {[
              ['home', 'Home'],
              ['themes', 'Thema’s'],
              ['verbs', 'Werkwoorden'],
              ['practice', 'Oefenen'],
              ['profile', 'Profiel'],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`nav-btn ${tab === key ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
