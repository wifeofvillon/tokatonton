const OFFICIAL_DOCS = [
  {
    title: 'Hello World - React',
    url: 'https://reactjs.org/docs/hello-world.html'
  },
  {
    title: 'Introducing JSX - React',
    url: 'https://reactjs.org/docs/introducing-jsx.html'
  },
  {
    title: 'Rendering Elements - React',
    url: 'https://reactjs.org/docs/rendering-elements.html'
  },
  {
    title: 'Components and Props - React',
    url: 'https://reactjs.org/docs/components-and-props.html'
  },
  {
    title: 'State and Lifecycle - React',
    url: 'https://reactjs.org/docs/state-and-lifecycle.html'
  },
  {
    title: 'Handling Events - React',
    url: 'https://reactjs.org/docs/handling-events.html'
  },
  {
    title: 'Conditional Rendering - React',
    url: 'https://reactjs.org/docs/conditional-rendering.html'
  },
  {
    title: 'Lists and Keys - React',
    url: 'https://reactjs.org/docs/lists-and-keys.html'
  },
  {
    title: 'Forms - React',
    url: 'https://reactjs.org/docs/forms.html'
  },
  {
    title: 'Lifting State Up - React',
    url: 'https://reactjs.org/docs/lifting-state-up.html'
  },
  {
    title: 'Composition vs Inheritance - React',
    url: 'https://reactjs.org/docs/composition-vs-inheritance.html'
  }
];

const PRACTICE_FILES = [
  {
    file: 'hello-world.html',
    date: 'Nov. 08, 2017'
  },
  {
    file: 'introducing-jsx.html',
    date: 'Nov. 14, 2017'
  },
  {
    file: 'rendering-elements.html',
    date: 'Nov. 14, 2017'
  },
  {
    file: 'components-and-props.html',
    date: 'Nov. 15, 2017'
  }
];

const TABLE_HEADER = ['Official Docs', 'Practice with your own hands', 'Date'];

function linkToOfficial(docs) {
  return <a href={docs.url} target="_blank">{docs.title}</a>
}

function linkToPractice(files) {
  let filePath = './' + files.file;
  return <a href={filePath}>{files.file}</a>
}

function tableHeader() {
  let ths = [];

  for (var i = 0; i < TABLE_HEADER.length; i++) {
    ths.push(<th key={i}>{TABLE_HEADER[i]}</th>);
  }

  return <thead><tr>{ths}</tr></thead>;
}

function tableBody() {
  let trs = [];

  for (var i = 0; i < OFFICIAL_DOCS.length; i++) {
    let c0 = <td>{linkToOfficial(OFFICIAL_DOCS[i])}</td>;
    let c1 = PRACTICE_FILES[i] ? <td>{linkToPractice(PRACTICE_FILES[i])}</td> : <td>-</td>;
    let c2 = PRACTICE_FILES[i] ? <td>{PRACTICE_FILES[i].date}</td> : <td>-</td>;
    trs.push(<tr key={i}>{c0}{c1}{c2}</tr>);
  }

  return <tbody>{trs}</tbody>;
}

function table() {
  return <table>{tableHeader()}{tableBody()}</table>
}

ReactDOM.render(table(), document.getElementById('link-list'));
